import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { AnalysisService } from 'src/analysis/analysis.service';
import { CoinPrice } from 'src/common/schemas/coin-price.schema';
import { FundData } from 'src/common/schemas/fund-data.schema';
import { TradingResult } from 'src/common/schemas/trading-result.schema';

@Injectable()
export class TradingService {
  constructor(
    @InjectModel('TradingResult')
    private tradingResultModel: Model<TradingResult>,
    @InjectModel('FundData')
    private fundDataModel: Model<FundData>,
    @InjectModel('CoinPrice')
    private coinPriceModel: Model<CoinPrice>,

    private analysisService: AnalysisService,
  ) {}

  // @Cron('0 * * * *')
  async handleTrading() {
    console.log('Running ai agent trading');
    const fundDataList = await this.fundDataModel.find();

    for (const fundDataInfo of fundDataList) {
      const result = await this.getAgentTrading(fundDataInfo.id);
      console.log('result', JSON.stringify(result, null, 2));
    }
  }

  async getAgentTrading(fundId: string) {
    const fundDataInfo = await this.fundDataModel.findById(fundId);

    const analysis = await this.analysisService.getCoinTradingStrategy(
      fundDataInfo.id,
    );

    let parsedAnalysis;
    try {
      parsedAnalysis =
        typeof analysis === 'string' ? JSON.parse(analysis) : analysis;
    } catch (error) {
      throw new Error('Failed to parse analysis data');
    }

    if (!parsedAnalysis || !Array.isArray(parsedAnalysis.coins)) {
      throw new Error('Invalid analysis data');
    }

    const response = await this.setAgentTrading(fundId, parsedAnalysis);

    return response;
  }

  async setAgentTrading(fundId: string, agentAnalysis: any) {
    let fundDataInfo = await this.fundDataModel.findById(fundId).lean();
    const totalFundBalance =
      fundDataInfo.balance +
      (fundDataInfo.portfolio && fundDataInfo.portfolio.length > 0
        ? fundDataInfo.portfolio.reduce(
            (sum, coin) => sum + coin.tradingAmount,
            0,
          )
        : 0);

    for (const coin of agentAnalysis.coins) {
      fundDataInfo = await this.fundDataModel.findById(fundId).lean();

      const currentPosition = fundDataInfo.portfolio.find(
        (p) => p.address === coin.address,
      );

      const coinPriceInfo = await this.coinPriceModel
        .findOne({ address: coin.address })
        .lean();

      if (coin.recommendation === 'buy') {
        const currentAllocation = currentPosition
          ? currentPosition.allocation
          : 0;
        const allocationDifference = coin.allocation - currentAllocation;

        const tradingAmount = (allocationDifference / 100) * totalFundBalance;

        if (allocationDifference > 0 && fundDataInfo.balance >= tradingAmount) {
          const tradingResult: TradingResult = {
            fundId,
            name: coin.name,
            symbol: coin.symbol,
            address: coin.address,
            price: coinPriceInfo.current_price,
            amount: tradingAmount / coinPriceInfo.current_price,
            analysis: coin.analysis,
            recommendation: coin.recommendation,
            allocation: coin.allocation,
            tradingAmount,
          };

          await this.tradingResultModel.create(tradingResult);

          if (currentPosition) {
            await this.fundDataModel.findOneAndUpdate(
              { _id: fundId, 'portfolio.address': coin.address },
              {
                $inc: {
                  'portfolio.$.amount':
                    tradingAmount / coinPriceInfo.current_price,
                  'portfolio.$.tradingAmount': tradingAmount,
                },
                $set: { 'portfolio.$.allocation': coin.allocation },
              },
            );
          } else {
            await this.fundDataModel.findByIdAndUpdate(fundId, {
              $push: {
                portfolio: {
                  symbol: coin.symbol,
                  address: coin.address,
                  amount: tradingAmount / coinPriceInfo.current_price,
                  allocation: coin.allocation,
                  tradingAmount,
                },
              },
            });
          }

          await this.fundDataModel.findByIdAndUpdate(fundId, {
            $inc: { balance: -tradingAmount },
          });
        }
      } else if (coin.recommendation === 'sell' && currentPosition) {
        const currentAllocation = currentPosition.allocation;
        const allocationDifference = currentAllocation - coin.allocation;
        const tradingAmount = (allocationDifference / 100) * totalFundBalance;

        if (allocationDifference > 0) {
          const tradingResult: TradingResult = {
            fundId,
            name: coin.name,
            symbol: coin.symbol,
            address: coin.address,
            price: coinPriceInfo.current_price,
            amount: -tradingAmount / coinPriceInfo.current_price,
            analysis: coin.analysis,
            recommendation: coin.recommendation,
            allocation: coin.allocation,
            tradingAmount,
          };

          await this.tradingResultModel.create(tradingResult);

          const updatedAmount = Math.max(
            currentPosition.amount -
              tradingAmount / coinPriceInfo.current_price,
            0,
          );

          await this.fundDataModel.findOneAndUpdate(
            { _id: fundId, 'portfolio.address': coin.address },
            {
              $set: {
                'portfolio.$.amount': updatedAmount <= 0 ? 0 : updatedAmount,
                'portfolio.$.allocation':
                  updatedAmount <= 0 ? 0 : coin.allocation,
                'portfolio.$.tradingAmount':
                  currentPosition.tradingAmount - tradingAmount,
              },
            },
          );

          await this.fundDataModel.findByIdAndUpdate(fundId, {
            $inc: { balance: tradingAmount },
          });
        }
      }
      // 'hold' recommendation does not require any action
    }

    return {
      success: true,
      agentAnalysis,
    };
  }
}

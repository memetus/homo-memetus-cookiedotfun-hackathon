import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoinPrice } from 'src/common/schemas/coin-price.schema';
import { FundData } from 'src/common/schemas/fund-data.schema';
import { TradingResult } from 'src/common/schemas/trading-result.schema';

@Injectable()
export class AgentDataService {
  constructor(
    @InjectModel('FundData')
    private fundDataModel: Model<FundData>,
    @InjectModel('TradingResult')
    private tradingResultModel: Model<TradingResult>,
    @InjectModel('CoinPrice')
    private coinPriceModel: Model<CoinPrice>,
  ) {}

  async getAiDashboard(
    page: number,
    pageSize: number,
    sort?: string,
    sortOrder?: string,
  ) {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const fundDataInfo = await this.fundDataModel.find();

    if (!fundDataInfo) {
      throw new BadRequestException('fund not found');
    }

    const results = await Promise.all(
      fundDataInfo.map(async (fund) => {
        const tokens = await this.getAgentStatByFundId(fund._id.toString());

        return {
          fundId: fund._id.toString(),
          name: fund.name,
          nav: tokens.nav,
          realizedProfit: tokens.realizedProfit,
          unrealizedProfit: tokens.unrealizedProfit,
          totalPnL: tokens.totalPnL,
          createdAt: fund.createdAt,
        };
      }),
    );

    results.sort((a, b) => {
      const direction = sortOrder === 'asc' ? 1 : -1;
      if (sort === 'realized') {
        return (a.realizedProfit - b.realizedProfit) * direction;
      } else if (sort === 'unrealized') {
        return (a.unrealizedProfit - b.unrealizedProfit) * direction;
      } else if (sort === 'totalPnL') {
        return (a.totalPnL - b.totalPnL) * direction;
      } else if (sort === 'nav') {
        return (a.nav - b.nav) * direction;
      } else if (sort === 'age') {
        return (a.createdAt.getTime() - b.createdAt.getTime()) * direction;
      }
      return 0;
    });

    const paginatedResults = results.slice(skip, skip + limit);
    return {
      totalCount: results.length,
      results: paginatedResults,
    };
  }

  async getAiMetaData(fundId: string) {
    const fundDataInfo = await this.fundDataModel.findById(fundId);

    if (!fundDataInfo) {
      throw new BadRequestException('fund not found');
    }

    return {
      fundId: fundDataInfo._id,
      name: fundDataInfo.name,
      address: fundDataInfo.address,
      strategy: fundDataInfo.strategyPrompt,
      fundAmount: fundDataInfo.initialBalance,
      createdAt: fundDataInfo.createdAt,
    };
  }

  async getAgentStatByFundId(fundId: string) {
    const fundDataInfo = await this.fundDataModel.findById(fundId).lean();
    const { results: statData } = await this.getHoldingsByFundId(
      fundId,
      1,
      100,
    );

    const result = statData.reduce(
      (acc, token) => {
        acc.nav += token.nav;
        acc.realizedProfit += token.realizedProfit;
        acc.unrealizedProfit += token.unrealizedProfit;
        return acc;
      },
      { nav: 0, realizedProfit: 0, unrealizedProfit: 0 },
    );

    return {
      fundId: fundId,
      nav: parseFloat((result.nav + fundDataInfo.balance).toFixed(2)),
      realizedProfit: parseFloat(result.realizedProfit.toFixed(2)),
      unrealizedProfit: parseFloat(result.unrealizedProfit.toFixed(2)),
      totalPnL: parseFloat(
        (result.realizedProfit + result.unrealizedProfit).toFixed(2),
      ),
    };
  }

  async getActivityByFundId(fundId: string, page: number, pageSize: number) {
    const tradingResultInfo = await this.tradingResultModel
      .find({ fundId })
      .sort({ createdAt: 1 });

    if (!tradingResultInfo) {
      throw new BadRequestException('fund not found');
    }

    const tokenMap = new Map<
      string,
      { totalAmount: number; totalPurchaseCost: number }
    >();

    const resultsWithPriceInfo = await Promise.all(
      tradingResultInfo.map(async (result) => {
        let profit = null;

        if (!tokenMap.has(result.address)) {
          tokenMap.set(result.address, {
            totalAmount: 0,
            totalPurchaseCost: 0,
          });
        }

        const tokenData = tokenMap.get(result.address);

        if (result.recommendation === 'buy') {
          // 매수
          tokenData.totalAmount += result.amount;
          tokenData.totalPurchaseCost += result.price * result.amount;
        } else if (result.recommendation === 'sell') {
          // 매도
          const averagePurchasePrice =
            tokenData.totalPurchaseCost / tokenData.totalAmount;
          profit = parseFloat(
            (result.amount * (averagePurchasePrice - result.price)).toFixed(2),
          );
          tokenData.totalAmount -= result.amount;
          tokenData.totalPurchaseCost -= averagePurchasePrice * result.amount;
        }

        const totalProfit = profit !== null ? profit : 0;

        return {
          type: result.recommendation,
          token: result.symbol,
          address: result.address,
          total: parseFloat((result.tradingAmount + totalProfit).toFixed(2)),
          profit: profit,
          createdAt: result.createdAt,
        };
      }),
    );

    resultsWithPriceInfo.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    const paginatedResults = resultsWithPriceInfo.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    return {
      totalCount: resultsWithPriceInfo.length,
      results: paginatedResults,
    };
  }

  async getHoldingsByFundId(
    fundId: string,
    page: number,
    pageSize: number,
    sort?: string,
    sortOrder?: string,
  ) {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const fundDataInfo = await this.fundDataModel.findById(fundId);

    if (!fundDataInfo) {
      throw new BadRequestException('fund not found');
    }

    const resultsWithPriceInfo = await Promise.all(
      fundDataInfo.portfolio.map(async (result) => {
        const coinPriceInfo = await this.coinPriceModel.findOne({
          address: result.address,
        });

        let realizedProfit = 0,
          unrealizedProfit = 0;

        // 해당 코인의 모든 거래 내역 가져오기
        const tradingResultInfo = await this.tradingResultModel.find({
          fundId,
          address: result.address,
        });

        // 보유 수량 및 실현 이익 계산
        let totalAmount = 0;
        let totalPurchaseCost = 0;
        let initialInvestment = 0;
        tradingResultInfo.forEach((trade) => {
          if (trade.amount > 0) {
            // 매수
            totalAmount += trade.amount;
            totalPurchaseCost += trade.price * trade.amount;
            initialInvestment += trade.price * trade.amount;
          } else {
            // 매도
            const sellAmount = -trade.amount;
            const averagePurchasePrice = totalPurchaseCost / totalAmount;
            realizedProfit += sellAmount * (trade.price - averagePurchasePrice);
            totalAmount -= sellAmount;
            totalPurchaseCost -= averagePurchasePrice * sellAmount;
          }
        });

        if (totalAmount > 0) {
          // 미실현 이익 계산
          const currentPrice = coinPriceInfo.current_price; // 현재 가격
          const averagePurchasePrice = totalPurchaseCost / totalAmount;
          unrealizedProfit = parseFloat(
            ((currentPrice - averagePurchasePrice) * totalAmount).toFixed(2),
          );
        }

        const totalProfit = realizedProfit + unrealizedProfit;
        const totalProfitPercent = (totalProfit / initialInvestment) * 100;

        return {
          token: result.symbol,
          address: result.address,
          realizedProfit: parseFloat(realizedProfit.toFixed(2)),
          unrealizedProfit: parseFloat(unrealizedProfit.toFixed(2)),
          totalPnL: parseFloat(totalProfitPercent.toFixed(2)),
          nav: parseFloat(
            (result.tradingAmount + realizedProfit + unrealizedProfit).toFixed(
              2,
            ),
          ),
        };
      }),
    );

    resultsWithPriceInfo.sort((a, b) => {
      const direction = sortOrder === 'asc' ? 1 : -1;
      if (sort === 'realized') {
        return (a.realizedProfit - b.realizedProfit) * direction;
      } else if (sort === 'unrealized') {
        return (a.unrealizedProfit - b.unrealizedProfit) * direction;
      } else if (sort === 'totalPnL') {
        return (a.totalPnL - b.totalPnL) * direction;
      } else if (sort === 'nav') {
        return (a.nav - b.nav) * direction;
      }
      return 0;
    });

    const paginatedResults = resultsWithPriceInfo.slice(skip, skip + limit);

    return {
      totalCount: resultsWithPriceInfo.length,
      results: paginatedResults,
    };
  }
}

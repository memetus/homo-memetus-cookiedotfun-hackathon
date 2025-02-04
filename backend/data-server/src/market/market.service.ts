import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONSTANTS } from 'src/common/config/constants';
import { CoinData } from 'src/common/schema/coin-data.schema';
import { CoinPrice } from 'src/common/schema/coin-price.schema';
import axios from 'axios';
import { EmbeddingService } from 'src/embedding/embedding.service';

@Injectable()
export class MarketService {
  private readonly coinGeckoBaseUrl: string;
  private readonly coinGeckoApiKey: string;

  constructor(
    @InjectModel('CoinData')
    private coinDataModel: Model<CoinData>,

    @InjectModel('CoinPrice')
    private coinPriceModel: Model<CoinPrice>,

    private configService: ConfigService,
    private embeddingService: EmbeddingService,
  ) {
    this.coinGeckoBaseUrl = CONSTANTS.coinGeckoUrl;
    this.coinGeckoApiKey = this.configService.get<string>(
      'ai-agent.coinGeckoService',
    );
  }

  async setPriceEmbedding() {
    const coinDataInfo = await this.coinDataModel.find();
    const totalData = [];
    const chunkSize = 500; // 한 번에 요청할 최대 코인 ID 수
    const url = `${this.coinGeckoBaseUrl}/coins/markets`;

    for (let i = 0; i < coinDataInfo.length; i += chunkSize) {
      const chunk = coinDataInfo
        .slice(i, i + chunkSize)
        .map((coin) => coin.slug)
        .join(',');

      for (let page = 1; page <= 2; page++) {
        const params = {
          vs_currency: 'usd',
          ids: chunk,
          per_page: 250,
          page: page,
          price_change_percentage: '1h,24h,7d',
        };

        try {
          const response = await axios.get(url, {
            headers: {
              accept: 'application/json',
              'x-cg-pro-api-key': this.coinGeckoApiKey,
            },
            params: params,
          });

          totalData.push(...response.data);
        } catch (error) {
          console.error(
            'Error fetching data from CoinGecko API:',
            error.response?.data || error.message,
          );
          throw new Error('Failed to fetch data from CoinGecko API');
        }
      }
    }

    console.log(`Total number of items in totalData: ${totalData.length}`);

    // totalData를 coinPriceModel 데이터베이스에 저장하기 전에 각 객체에 coinId와 address를 추가
    for (const item of totalData) {
      const coinData = coinDataInfo.find((coin) => coin.slug === item.id);
      if (coinData) {
        item.coinId = item.id;
        item.address = coinData.address;
        item.category = coinData.category;
      }
    }

    // 데이터베이스에 같은 address가 있으면 업데이트, 없으면 삽입
    for (const item of totalData) {
      try {
        await this.coinPriceModel.updateOne(
          { address: item.address },
          { $set: item },
          { upsert: true },
        );
      } catch (error) {
        console.error('Error saving data to coinPriceModel:', error);
        throw new Error('Failed to save data to coinPriceModel');
      }
    }

    this.embeddingService.createEmbeddings();

    console.log('Data successfully saved to coinPriceModel');
    return 'Data successfully saved to coinPriceModel';
  }

  async getDataTest() {
    const coinDataInfo = await this.coinDataModel.find().limit(500);
    const ids = coinDataInfo.map((coin) => coin.slug).join(',');

    const url = `${this.coinGeckoBaseUrl}/simple/price`;
    const params = {
      ids: ids,
      vs_currencies: 'usd',
    };

    try {
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          'x-cg-pro-api-key': this.coinGeckoApiKey,
        },
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching data from CoinGecko API:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch data from CoinGecko API');
    }
  }
}

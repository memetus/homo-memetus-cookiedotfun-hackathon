import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONSTANTS } from 'src/common/config/constants';
import { CoinData } from 'src/common/schema/coin-data.schema';
import { CoinPrice } from 'src/common/schema/coin-price.schema';
import axios from 'axios';

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
  ) {
    this.coinGeckoBaseUrl = CONSTANTS.coinGeckoUrl;
    this.coinGeckoApiKey = this.configService.get<string>(
      'ai-agent.coinGeckoService',
    );
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

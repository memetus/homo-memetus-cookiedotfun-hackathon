import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type CoinPriceDocument = CoinPrice & mongoose.Document;

@Schema()
export class CoinPrice {
  @Prop()
  coinId: string;

  @Prop()
  symbol: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  image: string;

  @Prop()
  category: string[];

  @Prop()
  current_price: number;

  @Prop()
  market_cap: number;

  @Prop()
  fully_diluted_valuation: number;

  @Prop()
  total_volume: number;

  @Prop()
  high_24h: number;

  @Prop()
  low_24h: number;

  @Prop()
  price_change_24h: number;

  @Prop()
  price_change_percentage_24h: number;

  @Prop()
  circulating_supply: number;

  @Prop()
  total_supply: number;

  @Prop()
  max_supply: number;

  @Prop()
  ath: number;

  @Prop()
  ath_change_percentage: number;

  @Prop({ type: Date })
  ath_date: Date;

  @Prop()
  atl: number;

  @Prop()
  atl_change_percentage: number;

  @Prop({ type: Date })
  atl_date: Date;

  @Prop({ type: Date })
  last_updated: Date;

  @Prop()
  price_change_percentage_1h_in_currency: number;

  @Prop()
  price_change_percentage_24h_in_currency: number;

  @Prop()
  price_change_percentage_7d_in_currency: number;

  @Prop({ type: [Number] })
  embedding?: number[];
}

export const CoinPriceSchema = SchemaFactory.createForClass(CoinPrice);

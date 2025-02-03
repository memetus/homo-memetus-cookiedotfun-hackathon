import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TradingResultDocument = TradingResult & mongoose.Document;

@Schema({ timestamps: true })
export class TradingResult {
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  address: string;

  @Prop()
  analysis: string;

  @Prop()
  recommendation: string;

  @Prop()
  allocation: number;

  @Prop()
  date: Date;

  @Prop()
  balance: number;

  @Prop()
  createdAt: Date;

  @Prop({ type: Map, of: Number })
  portfolio: Map<string, number>;
}

export const TradingResultSchema = SchemaFactory.createForClass(TradingResult);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FundDataDocument = FundData & mongoose.Document;

@Schema({ timestamps: true })
export class FundData {
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  address: string;

  @Prop()
  initialBalance: number;

  @Prop()
  balance: number;

  @Prop()
  strategyPrompt: string;

  @Prop({
    type: [
      {
        symbol: { type: String, required: true },
        address: { type: String, required: true },
        amount: { type: Number, required: true },
        allocation: { type: Number, required: true },
        tradingAmount: { type: Number, required: true },
      },
    ],
    default: [],
  })
  portfolio: Array<{
    symbol: string;
    address: string;
    amount: number;
    allocation: number;
    tradingAmount: number;
  }>;

  @Prop()
  createdAt: Date;
}

export const FundDataSchema = SchemaFactory.createForClass(FundData);

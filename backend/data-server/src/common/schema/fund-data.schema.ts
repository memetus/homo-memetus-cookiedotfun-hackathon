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
  createdAt: Date;
}

export const FundDataSchema = SchemaFactory.createForClass(FundData);

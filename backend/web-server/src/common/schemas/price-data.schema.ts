import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PriceDataDocument = PriceData & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class PriceData {
  @Prop()
  userWallet: string;

  @Prop()
  prompt: string;

  @Prop()
  gptResponse: string;

  @Prop()
  createdAt: Date;
}

export const PriceDataSchema = SchemaFactory.createForClass(PriceData);

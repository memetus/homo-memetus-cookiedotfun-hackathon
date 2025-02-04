import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CoinDataDocument = CoinData & mongoose.Document;

@Schema({ timestamps: true, versionKey: '_v' })
export class CoinData {
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  address: string;

  @Prop()
  category: string[];

  @Prop()
  marketCap: number;

  @Prop({ type: [Number] }) // 임베딩 벡터를 저장할 배열 필드 추가
  embedding?: number[];
}

export const CoinDataSchema = SchemaFactory.createForClass(CoinData);

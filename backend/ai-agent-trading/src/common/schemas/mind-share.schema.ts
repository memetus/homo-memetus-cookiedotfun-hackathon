import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type MindShareDocument = MindShare & mongoose.Document;

@Schema()
export class MindShare {
  @Prop()
  agentName: string;

  @Prop()
  address: string;

  @Prop()
  twitterUsernames: string[];

  @Prop()
  mindshare: number;

  @Prop()
  mindshareDeltaPercent: number;

  @Prop()
  marketCap: number;

  @Prop()
  marketCapDeltaPercent: number;

  @Prop()
  price: number;

  @Prop()
  priceDeltaPercent: number;

  @Prop()
  liquidity: number;

  @Prop()
  volume24Hours: number;

  @Prop()
  volume24HoursDeltaPercent: number;

  @Prop()
  holdersCount: number;

  @Prop()
  holdersCountDeltaPercent: number;

  @Prop()
  averageImpressionsCount: number;

  @Prop()
  averageImpressionsCountDeltaPercent: number;

  @Prop()
  averageEngagementsCount: number;

  @Prop()
  averageEngagementsCountDeltaPercent: number;

  @Prop()
  followersCount: number;

  @Prop()
  smartFollowersCount: number;

  @Prop()
  topTweets: string[];
}

export const MindShareSchema = SchemaFactory.createForClass(MindShare);

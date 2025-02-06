import { Module } from '@nestjs/common';
import { CoinDataSchema } from 'src/common/schemas/coin-data.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinPriceSchema } from 'src/common/schemas/coin-price.schema';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { FundDataSchema } from 'src/common/schemas/fund-data.schema';
import { TradingResultSchema } from 'src/common/schemas/trading-result.schema';
import { MindShareSchema } from 'src/common/schemas/mind-share.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CoinData', schema: CoinDataSchema },
      { name: 'CoinPrice', schema: CoinPriceSchema },
      { name: 'FundData', schema: FundDataSchema },
      { name: 'TradingResult', schema: TradingResultSchema },
      { name: 'MindShare', schema: MindShareSchema },
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}

import { Module } from '@nestjs/common';
import { TradingService } from './trading.service';
import { TradingController } from './trading.controller';
import { FundDataSchema } from 'src/common/schemas/fund-data.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TradingResultSchema } from 'src/common/schemas/trading-result.schema';
import { CoinPriceSchema } from 'src/common/schemas/coin-price.schema';
import { AnalysisModule } from 'src/analysis/analysis.module';
import { MindShareSchema } from 'src/common/schemas/mind-share.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TradingResult', schema: TradingResultSchema },
      { name: 'FundData', schema: FundDataSchema },
      { name: 'CoinPrice', schema: CoinPriceSchema },
      { name: 'MindShare', schema: MindShareSchema },
    ]),
    AnalysisModule,
  ],
  controllers: [TradingController],
  providers: [TradingService],
})
export class TradingModule {}

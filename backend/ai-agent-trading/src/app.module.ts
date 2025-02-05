import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisModule } from './analysis/analysis.module';
import { FundModule } from './fund/fund.module';
import { HealthModule } from './health/health.module';
import { TradingModule } from './trading/trading.module';

@Module({
  imports: [AnalysisModule, FundModule, HealthModule, TradingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

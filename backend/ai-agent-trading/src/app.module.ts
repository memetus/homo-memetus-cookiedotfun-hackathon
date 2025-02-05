import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisModule } from './analysis/analysis.module';
import { FundModule } from './fund/fund.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AnalysisModule, FundModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

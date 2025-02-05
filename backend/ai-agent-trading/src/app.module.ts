import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisModule } from './analysis/analysis.module';
import { FundModule } from './fund/fund.module';

@Module({
  imports: [AnalysisModule, FundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

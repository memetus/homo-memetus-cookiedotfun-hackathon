import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { FundController } from './fund.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FundDataSchema } from 'src/common/schemas/fund-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FundData', schema: FundDataSchema }]),
  ],
  controllers: [FundController],
  providers: [FundService],
})
export class FundModule {}

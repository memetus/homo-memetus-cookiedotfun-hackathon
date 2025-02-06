import { Module } from '@nestjs/common';
import { SendAiService } from './send-ai.service';
import { SendAiController } from './send-ai.controller';
import { FundDataSchema } from 'src/common/schemas/fund-data.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FundData', schema: FundDataSchema }]),
  ],
  controllers: [SendAiController],
  providers: [SendAiService],
})
export class SendAiModule {}

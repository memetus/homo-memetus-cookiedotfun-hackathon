import { Module } from '@nestjs/common';
import { SendAiService } from './send-ai.service';
import { SendAiController } from './send-ai.controller';
import { FundDataSchema } from 'src/common/schemas/fund-data.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/common/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FundData', schema: FundDataSchema },
      { name: 'Users', schema: UsersSchema },
    ]),
  ],
  controllers: [SendAiController],
  providers: [SendAiService],
})
export class SendAiModule {}

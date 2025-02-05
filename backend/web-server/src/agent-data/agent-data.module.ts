import { Module } from '@nestjs/common';
import { AgentDataService } from './agent-data.service';
import { AgentDataController } from './agent-data.controller';

@Module({
  controllers: [AgentDataController],
  providers: [AgentDataService],
})
export class AgentDataModule {}

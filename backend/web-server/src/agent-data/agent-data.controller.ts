import { Controller, Get } from '@nestjs/common';
import { AgentDataService } from './agent-data.service';

@Controller('agent-data')
export class AgentDataController {
  constructor(private readonly agentDataService: AgentDataService) {}

  @Get()
  findAll() {
    return this.agentDataService.findAll();
  }
}

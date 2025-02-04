import { Controller, Get, Param, Query } from '@nestjs/common';
import { MindShareService } from './mind-share.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MindShare')
@Controller('mind-share')
export class MindShareController {
  constructor(private readonly mindShareService: MindShareService) {}

  @Get('agents')
  getAgentsPaged() {
    return this.mindShareService.getAgentsPaged();
  }

  @Get('agents/contract/:contractAddress')
  async getAgentByContract(@Param('contractAddress') contractAddress: string) {
    return this.mindShareService.getAgentByContract(contractAddress);
  }
}

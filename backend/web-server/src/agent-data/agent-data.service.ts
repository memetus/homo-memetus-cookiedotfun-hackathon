import { Injectable } from '@nestjs/common';

@Injectable()
export class AgentDataService {
  findAll() {
    return `This action returns all agentData`;
  }
}

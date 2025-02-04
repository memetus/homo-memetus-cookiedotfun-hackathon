import { Injectable } from '@nestjs/common';
import { CreateAgentDatumDto } from './dto/create-agent-datum.dto';
import { UpdateAgentDatumDto } from './dto/update-agent-datum.dto';

@Injectable()
export class AgentDataService {
  create(createAgentDatumDto: CreateAgentDatumDto) {
    return 'This action adds a new agentDatum';
  }

  findAll() {
    return `This action returns all agentData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agentDatum`;
  }

  update(id: number, updateAgentDatumDto: UpdateAgentDatumDto) {
    return `This action updates a #${id} agentDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} agentDatum`;
  }
}

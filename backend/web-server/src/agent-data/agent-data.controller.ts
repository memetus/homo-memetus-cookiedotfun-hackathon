import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgentDataService } from './agent-data.service';
import { CreateAgentDatumDto } from './dto/create-agent-datum.dto';
import { UpdateAgentDatumDto } from './dto/update-agent-datum.dto';

@Controller('agent-data')
export class AgentDataController {
  constructor(private readonly agentDataService: AgentDataService) {}

  @Post()
  create(@Body() createAgentDatumDto: CreateAgentDatumDto) {
    return this.agentDataService.create(createAgentDatumDto);
  }

  @Get()
  findAll() {
    return this.agentDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDatumDto: UpdateAgentDatumDto) {
    return this.agentDataService.update(+id, updateAgentDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentDataService.remove(+id);
  }
}

import { PartialType } from '@nestjs/swagger';
import { CreateAgentDatumDto } from './create-agent-datum.dto';

export class UpdateAgentDatumDto extends PartialType(CreateAgentDatumDto) {}

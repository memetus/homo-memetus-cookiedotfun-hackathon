import { PartialType } from '@nestjs/swagger';
import { CreatePromptGptDto } from './create-prompt-gpt.dto';

export class UpdatePromptGptDto extends PartialType(CreatePromptGptDto) {}

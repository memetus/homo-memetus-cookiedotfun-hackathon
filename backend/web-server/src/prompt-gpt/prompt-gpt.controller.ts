import { Controller, Get } from '@nestjs/common';
import { PromptGptService } from './prompt-gpt.service';

@Controller('prompt-gpt')
export class PromptGptController {
  constructor(private readonly promptGptService: PromptGptService) {}

  @Get()
  findAll() {
    return this.promptGptService.findAll();
  }
}

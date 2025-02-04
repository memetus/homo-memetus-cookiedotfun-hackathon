import { Module } from '@nestjs/common';
import { PromptGptService } from './prompt-gpt.service';
import { PromptGptController } from './prompt-gpt.controller';

@Module({
  controllers: [PromptGptController],
  providers: [PromptGptService],
})
export class PromptGptModule {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromptGptService } from './prompt-gpt.service';
import { CreatePromptGptDto } from './dto/create-prompt-gpt.dto';
import { UpdatePromptGptDto } from './dto/update-prompt-gpt.dto';

@Controller('prompt-gpt')
export class PromptGptController {
  constructor(private readonly promptGptService: PromptGptService) {}

  @Post()
  create(@Body() createPromptGptDto: CreatePromptGptDto) {
    return this.promptGptService.create(createPromptGptDto);
  }

  @Get()
  findAll() {
    return this.promptGptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promptGptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromptGptDto: UpdatePromptGptDto) {
    return this.promptGptService.update(+id, updatePromptGptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promptGptService.remove(+id);
  }
}

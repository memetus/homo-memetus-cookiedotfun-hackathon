import { Injectable } from '@nestjs/common';
import { CreatePromptGptDto } from './dto/create-prompt-gpt.dto';
import { UpdatePromptGptDto } from './dto/update-prompt-gpt.dto';

@Injectable()
export class PromptGptService {
  create(createPromptGptDto: CreatePromptGptDto) {
    return 'This action adds a new promptGpt';
  }

  findAll() {
    return `This action returns all promptGpt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promptGpt`;
  }

  update(id: number, updatePromptGptDto: UpdatePromptGptDto) {
    return `This action updates a #${id} promptGpt`;
  }

  remove(id: number) {
    return `This action removes a #${id} promptGpt`;
  }
}

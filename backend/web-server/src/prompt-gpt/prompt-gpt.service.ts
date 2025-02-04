import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptGptService {
  findAll() {
    return `This action returns all promptGpt`;
  }
}

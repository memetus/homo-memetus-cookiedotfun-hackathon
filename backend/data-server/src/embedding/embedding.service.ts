import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbeddingService {
  findAll() {
    return `This action returns all embedding`;
  }
}

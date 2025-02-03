import { Controller, Get } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('embedding')
@Controller('embedding')
export class EmbeddingController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  @Get('create-embedding')
  createEmbeddings() {
    return this.embeddingService.createEmbeddings();
  }
}

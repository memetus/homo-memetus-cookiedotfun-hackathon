import { PartialType } from '@nestjs/swagger';
import { CreateEmbeddingDto } from './req.dto';

export class UpdateEmbeddingDto extends PartialType(CreateEmbeddingDto) {}

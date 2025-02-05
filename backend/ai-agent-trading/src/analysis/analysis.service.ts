import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisService {
  findAll() {
    return `This action returns all analysis`;
  }
}

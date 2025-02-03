import { Injectable } from '@nestjs/common';

@Injectable()
export class MindShareService {
  findAll() {
    return `This action returns all mindShare`;
  }
}

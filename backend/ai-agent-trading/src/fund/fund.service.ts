import { Injectable } from '@nestjs/common';

@Injectable()
export class FundService {
  findAll() {
    return `This action returns all fund`;
  }
}

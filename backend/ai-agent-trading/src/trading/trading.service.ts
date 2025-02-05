import { Injectable } from '@nestjs/common';

@Injectable()
export class TradingService {
  findAll() {
    return `This action returns all trading`;
  }
}

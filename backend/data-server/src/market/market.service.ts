import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketService {
  findAll() {
    return `This action returns all market`;
  }
}

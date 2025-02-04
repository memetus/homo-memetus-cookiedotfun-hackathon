import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Market')
@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('price-embedding')
  setPriceEmbedding() {
    return this.marketService.setPriceEmbedding();
  }

  @Get('coin-gecko-test')
  getDataTest() {
    return this.marketService.getDataTest();
  }
}

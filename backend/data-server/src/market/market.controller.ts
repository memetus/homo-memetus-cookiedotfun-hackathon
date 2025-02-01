import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @ApiTags('Market')
  @Get()
  findAll() {
    return this.marketService.findAll();
  }
}

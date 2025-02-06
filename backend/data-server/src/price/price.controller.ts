import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('price')
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get('price-embedding')
  setPriceEmbedding() {
    return this.priceService.setPriceEmbedding();
  }

  @Get('coin-gecko-test')
  getDataTest() {
    return this.priceService.getDataTest();
  }
}

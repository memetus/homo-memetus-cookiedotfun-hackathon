import { Controller, Get } from '@nestjs/common';
import { TradingService } from './trading.service';

@Controller('trading')
export class TradingController {
  constructor(private readonly tradingService: TradingService) {}

  @Get()
  findAll() {
    return this.tradingService.findAll();
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { FundService } from './fund.service';
import { CreateFundDto } from './dto/req.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('fund')
@Controller('fund')
export class FundController {
  constructor(private readonly fundService: FundService) {}

  @Post('create-fund')
  create(@Body() createFundDto: CreateFundDto) {
    return this.fundService.create(createFundDto);
  }

  @Get()
  findAll() {
    return this.fundService.findAll();
  }
}

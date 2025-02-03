import { Controller, Get } from '@nestjs/common';
import { MindShareService } from './mind-share.service';

@Controller('mind-share')
export class MindShareController {
  constructor(private readonly mindShareService: MindShareService) {}

  @Get()
  findAll() {
    return this.mindShareService.findAll();
  }
}

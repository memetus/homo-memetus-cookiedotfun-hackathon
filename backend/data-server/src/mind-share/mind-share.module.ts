import { Module } from '@nestjs/common';
import { MindShareService } from './mind-share.service';
import { MindShareController } from './mind-share.controller';

@Module({
  controllers: [MindShareController],
  providers: [MindShareService],
})
export class MindShareModule {}

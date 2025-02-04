import { Module } from '@nestjs/common';
import { MindShareService } from './mind-share.service';
import { MindShareController } from './mind-share.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MindShareSchema } from 'src/common/schema/mind-share.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'MindShare', schema: MindShareSchema }]),
  ],
  controllers: [MindShareController],
  providers: [MindShareService],
})
export class MindShareModule {}

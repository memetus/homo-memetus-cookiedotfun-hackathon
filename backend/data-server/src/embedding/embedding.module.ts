import { Module } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { EmbeddingController } from './embedding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinDataSchema } from 'src/common/schema/coin-data.schema';
import { CoinPriceSchema } from 'src/common/schema/coin-price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CoinData', schema: CoinDataSchema },
      { name: 'CoinPrice', schema: CoinPriceSchema },
    ]),
  ],
  controllers: [EmbeddingController],
  providers: [EmbeddingService],
  exports: [EmbeddingService],
})
export class EmbeddingModule {}

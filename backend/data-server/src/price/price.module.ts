import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { CoinDataSchema } from 'src/common/schema/coin-data.schema';
import { CoinPriceSchema } from 'src/common/schema/coin-price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CoinData', schema: CoinDataSchema },
      { name: 'CoinPrice', schema: CoinPriceSchema },
    ]),
    EmbeddingModule,
  ],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}

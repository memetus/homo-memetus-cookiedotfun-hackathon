import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinDataSchema } from 'src/common/schema/coin-data.schema';
import { CoinPriceSchema } from 'src/common/schema/coin-price.schema';
import { EmbeddingModule } from 'src/embedding/embedding.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CoinData', schema: CoinDataSchema },
      { name: 'CoinPrice', schema: CoinPriceSchema },
    ]),
    EmbeddingModule,
  ],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}

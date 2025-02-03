import { OpenAIEmbeddings } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoinData } from 'src/common/schema/coin-data.schema';
import { CoinPrice } from 'src/common/schema/coin-price.schema';

@Injectable()
export class EmbeddingService {
  private openaiEmbeddings: OpenAIEmbeddings;

  constructor(
    @InjectModel('CoinData')
    private coinDataModel: Model<CoinData>,
    @InjectModel('CoinPrice')
    private coinPriceModel: Model<CoinPrice>,
    private configService: ConfigService,
  ) {
    this.openaiEmbeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      batchSize: 2048,
      stripNewLines: true,
    });
  }

  async createEmbeddings() {
    const collection = this.coinPriceModel.collection;
    const documents = await this.coinPriceModel.find().lean();

    // Market Cap 범위 토큰화 함수
    const getMarketCapToken = (marketCap: number): string => {
      if (marketCap < 1000000) return 'small_cap';
      if (marketCap < 5000000) return 'mid_cap';
      return 'large_cap';
    };

    documents.map(async (doc) => {
      // const { embedding, ...docWithoutEmbedding } = doc;
      const { embedding, category } = doc;

      const docWithoutEmbedding = { category };
      // 순서 보존을 위한 토큰 추가
      const marketCapToken = getMarketCapToken(doc.market_cap);
      const enrichedDoc = {
        ...docWithoutEmbedding,
        market_cap_token: marketCapToken,
      };

      const pageContent = JSON.stringify(enrichedDoc);

      const newEmbedding = await this.openaiEmbeddings.embedDocuments([
        pageContent, // 문자열로 전달
      ]);

      await collection.updateOne(
        { _id: doc._id },
        {
          $set: {
            embedding: newEmbedding[0],
            market_cap_token: marketCapToken,
            pageContent,
          },
        },
      );
    });

    const index = {
      name: 'vector_index',
      type: 'vectorSearch',
      definition: {
        fields: [
          {
            type: 'vector',
            numDimensions: 1536,
            path: 'embedding',
            similarity: 'cosine',
          },
        ],
      },
    };

    await this.dropAndCreateSearchIndex(collection, index);

    return 'Embeddings created successfully';
  }

  private async dropAndCreateSearchIndex(collection, index) {
    // 기존 인덱스가 존재하는지 확인하고 삭제
    const existingIndexes = await collection.listSearchIndexes().toArray();
    const indexExists = existingIndexes.some((idx) => idx.name === index.name);

    console.log(indexExists);

    if (indexExists) {
      await collection.dropSearchIndex(index.name);
    }

    await this.waitForIndexDeletion(collection, index.name);

    await collection.createSearchIndex(index);
  }

  private async waitForIndexDeletion(
    collection,
    indexName,
    interval = 5000,
    timeout = 1000000,
  ) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const existingIndexes = await collection.listSearchIndexes().toArray();
      const indexExists = existingIndexes.some((idx) => idx.name === indexName);

      if (!indexExists) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error(
      `Index ${indexName} was not deleted within the timeout period.`,
    );
  }
}

import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongodbConfig from './common/config/mongodb.config';
import swaggerConfig from './common/config/swagger.config';
import aiAgentConfig from './common/config/ai-agent.config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import { MarketModule } from './market/market.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { EmbeddingModule } from './embedding/embedding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [mongodbConfig, swaggerConfig, aiAgentConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.url'),
        user: configService.get<string>('mongodb.user'),
        pass: configService.get<string>('mongodb.pass'),
      }),
      inject: [ConfigService],
    }),
    MarketModule,
    HealthModule,
    EmbeddingModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

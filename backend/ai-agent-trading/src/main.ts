import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.STAGE === 'prod' ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.printf(({ timestamp, level, message }) => {
              const colorize = winston.format.colorize();
              return `${colorize.colorize(level, `${timestamp} ${level}:`)} ${message}`;
            }),
          ),
        }),
      ],
    }),
  });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      // class-transformer 적용
      transform: true,
    }),
  );

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [configService.get('swagger.user')]:
          configService.get('swagger.password'),
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cookie Hackathon AI agent-server API')
    .setDescription('API description')
    .setVersion('0.0.1')
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  const port = configService.get('PORT') || 8082;
  await app.listen(port);
  console.log(
    `AI agent trading simulator server is running on port ${port}, STAGE:${process.env.STAGE}`,
  );
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import winston from 'winston';
import env from './modules/main/app.env';
import { AppModule } from './modules/main/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({}),
  });

  const logger = app.get<winston.Logger>(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  await app.listen(env.PORT);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as elasticApmNode from 'elastic-apm-node';
import env from './modules/main/app.env';
import { AppModule } from './modules/main/app.module';

async function bootstrap() {
  elasticApmNode.start({
    secretToken: env.APM_SECRET_TOKEN,
    serverUrl: env.APM_SECRET_URL,
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(env.PORT);
}

bootstrap();

import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { KNEX_TOKEN } from '../../constants';
import knexConfig from '../../database/knexfile';
import { CatsModule } from '../cats/cats.module';
import { HealthModule } from '../health/health.module';
import { KnexModule } from '../knex/knex.module';

@Module({
  imports: [
    WinstonModule.forRoot({}),
    KnexModule.forRoot(KNEX_TOKEN, knexConfig),
    CatsModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe() },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}

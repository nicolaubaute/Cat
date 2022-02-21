import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { KNEX_TOKEN } from '../../constants';
import knexConfig from '../../database/knexfile';
import { BreedsModule } from '../breeds/breeds.module';
import { HealthModule } from '../health/health.module';
import { KnexModule } from '../knex/knex.module';

@Module({
  imports: [
    KnexModule.forRoot(KNEX_TOKEN, knexConfig),
    BreedsModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe() },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}

import { DynamicModule, Module } from '@nestjs/common';
import { Knex, knex } from 'knex';

export const KNEX_MODULE = 'KNEX_MODULE';

@Module({})
export class KnexModule {
  static forRoot(token: string, options: Knex.Config): DynamicModule {
    return {
      global: true,
      module: KnexModule,
      providers: [
        {
          provide: token,
          useFactory: () => {
            return knex(options);
          },
        },
      ],
      exports: [token],
    };
  }
}

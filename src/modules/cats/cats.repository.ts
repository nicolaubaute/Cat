import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BREEDS_TABLE, IMAGES_TABLE, KNEX_TOKEN } from '../../constants';
import { CatEntity } from './entities/cat.entity';
import { ImageEntity } from './entities/image.entity';
import { CatFilterType } from './types/cat-filter.type';

@Injectable()
export class CatsRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject(KNEX_TOKEN) private readonly knex: Knex) {}

  async find(filter: CatFilterType): Promise<CatEntity[]> {
    const query = this.knex(BREEDS_TABLE);

    Object.keys(filter).forEach((key) => {
      // @ts-ignore
      const value = filter[key];

      if (value) {
        query.where(key, 'like', `%${value}%`);
      }
    });

    return query;
  }

  async findOne(name: string): Promise<CatEntity> {
    return this.knex(BREEDS_TABLE).select().where({ name }).first();
  }

  async save(data: Partial<CatEntity>[]): Promise<void> {
    await this.knex(BREEDS_TABLE).insert(data).returning('*');
  }

  async saveImages(data: Partial<ImageEntity>[]): Promise<void> {
    await this.knex(IMAGES_TABLE).insert(data).returning('*');
  }

  async deleteAll(): Promise<void> {
    await this.knex(BREEDS_TABLE).delete();
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BREEDS_TABLE, IMAGES_TABLE, KNEX_TOKEN } from '../../constants';
import { BreedEntity } from './entities/breed.entity';
import { ImageEntity } from './entities/image.entity';
import { BreedFilterType } from './types/breed-filter.type';

@Injectable()
export class BreedsRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject(KNEX_TOKEN) private readonly knex: Knex) {}

  async find(filter: BreedFilterType): Promise<BreedEntity[]> {
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

  async findOne(name: string): Promise<BreedEntity> {
    return this.knex(BREEDS_TABLE).select().where({ name }).first();
  }

  async save(data: Partial<BreedEntity>[]): Promise<void> {
    await this.knex(BREEDS_TABLE).insert(data).returning('*');
  }

  async saveImages(data: Partial<ImageEntity>[]): Promise<void> {
    await this.knex(IMAGES_TABLE).insert(data).returning('*');
  }

  async deleteAll(): Promise<void> {
    await this.knex(BREEDS_TABLE).delete();

    await this.knex(IMAGES_TABLE).delete();
  }
}

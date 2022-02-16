import { Knex } from 'knex';
import { IMAGES_TABLE } from '../../constants';

export async function seed(knex: Knex): Promise<void> {
  await knex(IMAGES_TABLE).del();

  await knex(IMAGES_TABLE).insert([
    {
      id: '9x1zk_Qdr',
      url: 'https://cdn2.thecatapi.com/images/9x1zk_Qdr.jpg',
      breed_id: 'abys',
    },
  ]);
}

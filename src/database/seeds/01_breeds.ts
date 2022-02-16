import { Knex } from 'knex';
import { BREEDS_TABLE } from '../../constants';

export async function seed(knex: Knex): Promise<void> {
  await knex(BREEDS_TABLE).del();

  await knex(BREEDS_TABLE).insert([
    {
      id: 'abys',
      description:
        'The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.',
      name: 'Abyssinian',
      origin: 'Egypt',
      temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
    },
  ]);
}

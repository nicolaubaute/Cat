import { Knex } from 'knex';
import { BREEDS_TABLE } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    BREEDS_TABLE,
    (table: Knex.CreateTableBuilder) => {
      table.text('id').primary();
      table.text('name').notNullable();
      table.text('description').notNullable();
      table.text('origin').notNullable();
      table.text('temperament').notNullable();
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(BREEDS_TABLE);
}

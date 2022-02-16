import { Knex } from 'knex';
import { IMAGES_TABLE } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    IMAGES_TABLE,
    (table: Knex.CreateTableBuilder) => {
      table.text('id').primary();
      table.text('url').notNullable();
      table.text('breed_id').notNullable();
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(IMAGES_TABLE);
}

import type { Knex } from 'knex';

const TABLE_NAME = 'brand_colors';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id', { primaryKey: true });
    table.string('brand');
    table.string('hexcode');
  });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLE_NAME);
}


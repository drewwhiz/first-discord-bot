import type { Knex } from 'knex';

const TABLE_NAME = 'vendors';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable(TABLE_NAME, function (table) {
      table.increments('id', { primaryKey: true });
      table.string('prefix');
      table.string('url_format');
      table.string('source');
    });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLE_NAME);
}


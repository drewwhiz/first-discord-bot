import type { Knex } from 'knex';

const TABLE_NAME = 'songs';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable(TABLE_NAME, function (table) {
      table.increments('id', { primaryKey: true });
      table.string('name');
      table.string('artist');
      table.string('url');
    })
    .alterTable(TABLE_NAME, function (t) {
      t.unique('url');
    });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLE_NAME);
}


import type { Knex } from 'knex';

const TABLE_NAME = 'forbidden_phrases';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable(TABLE_NAME, function (table) {
      table.increments('id', { primaryKey: true });
      table.string('phrase');
    })
    .alterTable(TABLE_NAME, function (t) {
      t.unique('phrase');
    });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLE_NAME);
}


import type { Knex } from 'knex';

const TABLE_NAME = 'acronyms';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable(TABLE_NAME, function (table) {
      table.increments('id', { primaryKey: true });
      table.string('acronym').collate('utf8mb4_0900_as_cs');
      table.boolean('case_sensitive').defaultTo(false);
      table.text('explanation');
      table.boolean('is_channel_restricted').defaultTo(false);
    })
    .alterTable(TABLE_NAME, function (t) {
      t.unique('acronym');
    });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLE_NAME);
}


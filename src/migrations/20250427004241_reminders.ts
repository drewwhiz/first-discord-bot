import type { Knex } from 'knex';

const TABLE_NAME = 'reminders';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id', { primaryKey: true });
    table.string('user_id');
    table.string('channel_id');
    table.datetime('deadline');
    table.text('reminder');
  });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLE_NAME);
}


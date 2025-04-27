import type { Knex } from "knex";

const TABLE_NAME = 'cooldowns';


export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id', { primaryKey: true });
    table.string('command_name');
    table.string('channel_id');
    table.datetime('deadline');
  });
}


export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(TABLE_NAME);
}


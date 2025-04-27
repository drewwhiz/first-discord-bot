import type { Knex } from 'knex';

const TABLE_NAME = 'program_data';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id', { primaryKey: true });
    table.string('program_code');
    table.integer('current_season_year');
  });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TABLE_NAME);
}


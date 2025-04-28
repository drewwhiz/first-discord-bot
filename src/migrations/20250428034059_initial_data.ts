import type { Knex } from 'knex';
import {seed, unseed} from '../seeds/initial_data.js';

export async function up(knex: Knex): Promise<void> {
  return await seed(knex);
}


export async function down(knex: Knex): Promise<void> {
  return await unseed(knex);
}


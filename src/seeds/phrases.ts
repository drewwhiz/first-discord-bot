import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('forbidden_phrases').insert([
    { phrase: 'dual event' },
    { phrase: 'dual events' },
    { phrase: 'double event' },
    { phrase: 'double events' },
    { phrase: 'triple event' },
    { phrase: 'triple events' },
    { phrase: 'quadruple event' },
    { phrase: 'quadruple events' },
    { phrase: 'ftc swerve' },
    { phrase: 'ftcswerve' },
    { phrase: 'ftc swervedrive' },
    { phrase: 'ftcswervedrive' }
  ]);
};

export async function unseed(knex: Knex): Promise<void> {
  await knex('forbidden_phrases').del();
}
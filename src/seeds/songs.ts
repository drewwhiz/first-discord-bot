import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('songs').insert([
    { name: 'The Cha Cha Slide', artist: 'DJ Casper', url: 'https://www.youtube.com/watch?v=wZv62ShoStY' },
    { name: 'The Cupid Shuffle', artist: 'Cupid', url: 'https://www.youtube.com/watch?v=S3XfEjqfnn4' },
    { name: 'Jump On It', artist: 'Sir Mix-a-Lot', url: 'https://www.youtube.com/watch?v=tmCKnVaU7H0' },
    { name: 'The Chicken Dance', artist: null, url: 'https://www.youtube.com/watch?v=4xmV5uHWNag' },
    { name: 'The Hokey Pokey', artist: null, url: 'https://www.youtube.com/watch?v=iZinb6rVozc' }
  ]);
};

export async function unseed(knex: Knex): Promise<void> {
  await knex('songs').del();
}


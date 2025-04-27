import type { Knex } from "knex";

const TABLE_NAME = 'brand_colors';


export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable(TABLE_NAME, function (table) {
    table.increments('id', { primaryKey: true });
    table.string('brand');
    table.string('hexcode');
  });

  knex(TABLE_NAME)
    .insert({ brand: '', hexcode: '' })
    .insert({ brand: 'FIRST', hexcode: '#0066B3' })
    .insert({ brand: 'FIRST', hexcode: '#ED1C24' })
    .insert({ brand: 'FIRST', hexcode: '#9A989A' })
    .insert({ brand: 'FIRST', hexcode: '#231F20' })
    .insert({ brand: 'FLL',   hexcode: '#ED1C24' })
    .insert({ brand: 'FLL',   hexcode: '#231F20' })
    .insert({ brand: 'FLL',   hexcode: '#662D91' })
    .insert({ brand: 'FLL',   hexcode: '#00A651' })
    .insert({ brand: 'FTC',   hexcode: '#F57E25' })
    .insert({ brand: 'FTC',   hexcode: '#231F20' })
    .insert({ brand: 'FRC',   hexcode: '#009CD7' })
    .insert({ brand: 'FRC',   hexcode: '#231F20' })
    .insert({ brand: '10101', hexcode: '#010101' })
    .insert({ brand: '10101', hexcode: '#ffffff' })
    .insert({ brand: '10101', hexcode: '#00c1c1' })
    .insert({ brand: '10101', hexcode: '#f10101' })
    .insert({ brand: '10101', hexcode: '#fbca13' });
}


export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(TABLE_NAME);
}


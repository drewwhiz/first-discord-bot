import { IBrandColorDataService } from './interfaces/IBrandColorDataService.js';
import { IBrandColor } from '../models/IBrandColor.js';
import knex from 'knex';

export class BrandColorDataService implements IBrandColorDataService {
  private readonly _database: knex.Knex;

  public constructor(database: knex.Knex) {
    this._database = database;
  }

  public async getBrands(): Promise<string[]> {
    const rows = await this._database('brand_colors').distinct('brand').pluck('brand');
    if (rows == null) return [];
    if (rows.length == 0) return [];
    return rows as string[];
  }

  public async getByBrand(brand: string): Promise<IBrandColor[]> {
    const rows = await this._database('brand_colors').where('brand', brand).select('*');
    if (rows == null || rows.length == 0) return [];
    return rows as IBrandColor[];
  }
}
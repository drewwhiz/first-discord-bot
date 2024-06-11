import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { IBrandColorDataService } from './interfaces/IBrandColorDataService.js';
import { IBrandColor } from '../models/IBrandColor.js';

export class BrandColorDataService implements IBrandColorDataService {
  private readonly _database: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
    this._database = database;
  }

  async getByBrand(brand: string): Promise<IBrandColor[]> {
    const sql = 'SELECT * FROM BrandColors WHERE (brand = ?)';
    const results = await this._database.all(sql, [ brand ]);
    if (results == null) return [] as IBrandColor[];
    return results as IBrandColor[];
  }
}
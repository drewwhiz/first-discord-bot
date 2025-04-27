import knex from 'knex';
import { IVendorDataService } from './interfaces/IVendorDataService.js';
import { IVendor } from '../models/IVendor.js';

export class VendorDataService implements IVendorDataService
{
  private readonly _database: knex.Knex;

  public constructor(database: knex.Knex) {
    this._database = database;
  }

  public async getPrefixes(): Promise<string[]> {
    const rows = await this._database('vendors').distinct('prefix').pluck('prefix');
    if (rows == null) return [];
    if (rows.length == 0) return [];
    return rows as string[];
  }

  public async getVendors(): Promise<IVendor[]> {
    const rows = await this._database('vendors').select('*');
    if (rows == null) return [];
    if (rows.length == 0) return [];
    return rows as IVendor[];
  }

  public async getByPrefix(prefix: string): Promise<IVendor> {
    const row = await this._database('vendors').where('prefix', prefix).first('*');
    if (row == null) return null;
    return row as IVendor;
  }

  public async get(id: number): Promise<IVendor> {
    const row = await this._database('vendors').where('id', id).first('*');
    if (row == null) return null;
    return row as IVendor;
  }
}
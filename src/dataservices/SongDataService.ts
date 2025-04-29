import knex from 'knex';
import { ISong } from '../models/ISong.js';
import { ISongDataService } from './interfaces/ISongDataService.js';

export class SongDataService implements ISongDataService {
  private readonly _database: knex.Knex;

  public constructor(database: knex.Knex) {
    this._database = database;
  }
  
  public async getAll(): Promise<ISong[]> {
    const rows = await this._database('songs').select('*');
    if (rows == null) return [];
    if (rows.length == 0) return [];
    return rows as ISong[];
  }
}
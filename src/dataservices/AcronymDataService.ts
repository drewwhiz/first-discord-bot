import { IAcronymDataService } from './interfaces/IAcronymDataService.js';
import { IAcronym } from '../models/IAcronym.js';
import knex from 'knex';

export class AcronymDataService implements IAcronymDataService {
  private readonly _database: knex.Knex;

  public constructor(database: knex.Knex) {
    this._database = database;
  }

  public async get(acronym: string): Promise<IAcronym> {
    const upperCase = acronym.toUpperCase();
    const rows = await this._database('acronyms')
      .where({ 'acronym': acronym })
      .orWhere({ 'acronym': upperCase, 'case_sensitive': false })
      .select('*');

    if (rows == null || rows.length == 0) return null;
    return rows[0] as IAcronym;
  }
}
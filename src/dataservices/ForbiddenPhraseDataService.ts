import knex from 'knex';
import { IForbiddenPhraseDataService } from './interfaces/IForbiddenPhraseDataService.js';

export class ForbiddenPhraseDataService implements IForbiddenPhraseDataService {
  private readonly _database: knex.Knex;

  public constructor(database: knex.Knex) {
    this._database = database;
  }
  
  public async getAll(): Promise<string[]> {
    const rows = await this._database('forbidden_phrases').select('phrase').pluck('phrase');
    if (rows == null) return [];
    if (rows.length == 0) return [];
    return rows as string[];
  }
}
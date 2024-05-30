import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { IAcronymDataService } from './interfaces/IAcronymDataService.js';
import { IAcronym } from '../models/IAcronym.js';

export class AcronymDataService implements IAcronymDataService {
    private readonly _database: Database<sqlite3.Database, sqlite3.Statement>;

    constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
        this._database = database;
    }

    async get(acronym: string): Promise<IAcronym> {
        const lowercase = acronym.toUpperCase();
        const sql = 'SELECT * FROM Acronyms WHERE (acronym = ?) OR (acronym = ? AND caseSensitive = 0)';
        const row = await this._database.get(sql, [acronym, lowercase]);
        return row as IAcronym;
    }
}
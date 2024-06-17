import { IProgramDataService } from './interfaces/IProgramDataService.js';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { IFirstProgram } from '../models/IFirstProgram.js';
import { IProgramData } from '../models/IProgramData.js';
import { ProgramUtilities } from '../utility/ProgramUtilities.js';

export class ProgramDataService implements IProgramDataService {
  private readonly _database: Database<sqlite3.Database, sqlite3.Statement>;

  public constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
    this._database = database;
  }

  public async insert(record: IProgramData): Promise<IProgramData> {
    const matching = (await this.getAll()).filter(c => c.programCode == record.programCode);
    if (matching.length > 0) return matching[0];

    const sql = 'INSERT INTO ProgramData (programCode, currentSeasonYear) VALUES (?,?)';
    const result = await this._database.run(sql, [record.programCode, record.currentSeasonYear]);
    if (!result.lastID) return null;
    return await this.get(result.lastID);
  }

  public async getAll(): Promise<IProgramData[]> {
    const sql = 'SELECT * FROM ProgramData';
    const results = await this._database.all(sql);
    if (results == null) return [] as IProgramData[];
    return results as IProgramData[];
  }

  public async upsert(record: IProgramData): Promise<IProgramData> {
    if (record == null) return null;
    if (record.id > 0) return await this.update(record.id, record);
    return await this.insert(record);
  }

  public async get(id: number): Promise<IProgramData> {
    const sql = 'SELECT * FROM ProgramData WHERE id = ?';
    const row = await this._database.get(sql, [id]);
    return row as IProgramData;
  }

  public async getByProgram(program: IFirstProgram): Promise<IProgramData> {
    const programCode = ProgramUtilities.mapProgramToCode(program);
    if (program == null) return null;
    const sql = 'SELECT * FROM ProgramData WHERE programCode = ?';
    const row = await this._database.get(sql, [programCode]);
    return row as IProgramData;
  }

  public async update(id: number, updatedRecord: IProgramData): Promise<IProgramData> {
    const sql = 'UPDATE ProgramData SET programCode = ?, currentSeasonYear = ? WHERE id = ?';
    const result = await this._database.run(sql, [updatedRecord.programCode, updatedRecord.currentSeasonYear, id]);
    if (result.changes == 0) return await this.get(id);
    return updatedRecord;
  }
}
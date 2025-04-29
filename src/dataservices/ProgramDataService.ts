import { IProgramDataService } from './interfaces/IProgramDataService.js';
import { IFirstProgram } from '../models/IFirstProgram.js';
import { IProgramData } from '../models/IProgramData.js';
import knex from 'knex';
import { ProgramUtilities } from '../utility/ProgramUtilities.js';

export class ProgramDataService implements IProgramDataService {
  private readonly _database: knex.Knex;

  public constructor(database: knex.Knex) {
    this._database = database;
  }

  public async insert(record: IProgramData): Promise<IProgramData> {
    const matching = (await this.getAll()).filter(c => c.program_code == record.program_code);
    if (matching.length > 0) return matching[0];

    const [result] = await this._database('program_data').insert(record);
    return await this.get(result);
  }

  public async getAll(): Promise<IProgramData[]> {
    const rows = await this._database('program_data').select('*');
    if (rows == null) return [];
    if (rows.length == 0) return [];
    return rows as IProgramData[];
  }

  public async upsert(record: IProgramData): Promise<IProgramData> {
    if (record == null) return null;
    if (record.id > 0) return await this.update(record.id, record);
    return await this.insert(record);
  }

  public async get(id: number): Promise<IProgramData> {
    const row = await this._database('program_data')
      .where('id', id)
      .first('*');
    if (row == null) return null;
    return row as IProgramData;
  }

  public async getByProgram(program: IFirstProgram): Promise<IProgramData> {
    const programCode = ProgramUtilities.mapProgramToCode(program);
    if (program == null) return null;
    return await this._database('program_data')
      .where('program_code', programCode)
      .first('*') as IProgramData;
  }

  public async update(id: number, updatedRecord: IProgramData): Promise<IProgramData> {
    const result = await this._database('program_data')
      .where('id', id)
      .update(updatedRecord);
    return await this.get(result);
  }
}
import knex from 'knex';
import { ICooldown } from '../models/ICooldown.js';
import { ICooldownDataService } from './interfaces/ICooldownDataService.js';

export class CooldownDataService implements ICooldownDataService {
  private readonly _database: knex.Knex;

  public constructor(database: knex.Knex) {
    this._database = database;
  }

  public async get(id: number): Promise<ICooldown> {
    const row = await this._database('cooldowns')
      .where('id', id)
      .first('*');
    if (row == null) return null;
    return row as ICooldown;
  }

  public async add(cooldown: ICooldown): Promise<ICooldown> {
    const matching = await this.get(cooldown.id);
    if (matching != null) return matching;

    const [result] = await this._database('cooldowns').insert(cooldown);
    return await this.get(result);
  }

  public async getByCommand(command: string): Promise<ICooldown[]> {
    const rows = await this._database('cooldowns')
      .where('command_name', command)
      .select('*');
    if (rows == null || rows.length == 0) return [];
    return rows as ICooldown[];
  }

  public async getByKeys(command: string, channelId: string): Promise<ICooldown> {
    const row = await this._database('cooldowns')
      .where({command_name: command, channel_id: channelId })
      .first('*');
    if (row == null) return null;
    return row as ICooldown;
  }

  public async update(record: ICooldown): Promise<ICooldown> {
    const result = await this._database('cooldowns')
      .where({ command_name: record.command_name, channel_id: record.channel_id })
      .update(record);
    return await this.get(result);
  }

  public async upsert(record: ICooldown): Promise<ICooldown> {
    if (record == null) return null;
    const existing = await this.getByKeys(record.command_name, record.channel_id);
    if (existing == null) {
      return await this.add(record);
    } else {
      return await this.update(record);
    }
  }
}
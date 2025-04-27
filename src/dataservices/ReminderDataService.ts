import knex from 'knex';
import { IReminder } from '../models/IReminder.js';
import { IReminderDataService } from './interfaces/IReminderDataService.js';

export class ReminderDataService implements IReminderDataService {
  private readonly _database: knex.Knex;

  public constructor(database: knex.Knex) {
    this._database = database;
  }

  public async add(reminder: IReminder): Promise<IReminder> {
    const matching = await this.get(reminder.id);
    if (matching != null) return matching;

    const [result] = await this._database('reminders').insert(reminder);
    return await this.get(result);
  }

  public async get(id: number): Promise<IReminder> {
    const row = await this._database('reminders')
      .where('id', id)
      .first('*');
    if (row == null) return null;
    return row as IReminder;
  }

  public async getAll(): Promise<IReminder[]> {
    const rows = await this._database('reminders').select('*');
    if (rows == null) return [];
    if (rows.length == 0) return [];
    return rows as IReminder[];
  }

  public async delete(id: number): Promise<boolean> {
    return await this._database('reminders').where('id', id).del() === 1;
  }
}
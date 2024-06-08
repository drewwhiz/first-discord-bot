import { IReminder } from '../models/IReminder.js';
import { IReminderDataService } from './interfaces/IReminderDataService.js';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export class ReminderDataService implements IReminderDataService {
  private readonly _database: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
    this._database = database;
  }

  async add(reminder: IReminder): Promise<IReminder> {
    const matching = (await this.getAll()).filter(r => r.id == reminder.id);
    if (matching.length > 0) return matching[0];

    const sql = 'INSERT INTO Reminders (userId, channelId, deadline, reminder) VALUES (?, ?, ?, ?)';
    const result = await this._database.run(sql, [reminder.userId, reminder.channelId, reminder.deadline, reminder.reminder]);
    if (!result.lastID) return null;
    return await this.get(result.lastID);
  }

  async get(id: number): Promise<IReminder> {
    const sql = 'SELECT * FROM Reminders WHERE id = ?';
    const row = await this._database.get(sql, [id]);
    return row as IReminder;
  }

  async getAll(): Promise<IReminder[]> {
    const sql = 'SELECT * FROM Reminders';
    const results = await this._database.all(sql);
    if (results == null) return [] as IReminder[];
    return results as IReminder[];
  }

  async delete(id: number): Promise<boolean> {
    const sql = 'DELETE FROM Reminders WHERE id = ?';
    const row = await this._database.run(sql, [id]);
    return row.changes === 1;
  }

}
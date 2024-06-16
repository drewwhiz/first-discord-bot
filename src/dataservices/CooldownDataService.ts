import { ICooldown } from '../models/ICooldown.js';
import { ICooldownDataService } from './interfaces/ICooldownDataService.js';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export class CooldownDataService implements ICooldownDataService {
  private readonly _database: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
    this._database = database;
  }

  async get(id: number): Promise<ICooldown> {
    const sql = 'SELECT * FROM Cooldowns WHERE id = ?';
    const row = await this._database.get(sql, [id]);
    return row as ICooldown;
  }

  async add(cooldown: ICooldown): Promise<ICooldown> {
    const matching = (await this.getByKeys(cooldown.commandName, cooldown.channelId));
    if (matching != null) return matching;

    const sql = 'INSERT INTO Cooldowns (commandName, channelId, deadline) VALUES (?, ?, ?)';
    const result = await this._database.run(sql, [cooldown.commandName, cooldown.channelId, cooldown.deadline]);

    if (!result.lastID) return null;
    return await this.get(result.lastID);
  }

  async getByCommand(command: string): Promise<ICooldown[]> {
    const sql = 'SELECT * FROM Cooldowns WHERE commandName = ?';
    const results = await this._database.all(sql, [command]);
    if (results == null) return [] as ICooldown[];
    return results as ICooldown[];
  }

  async getByKeys(command: string, channelId: string): Promise<ICooldown> {
    const sql = 'SELECT * FROM Cooldowns WHERE commandName = ? AND channelId = ?';
    const row = await this._database.get(sql, [command, channelId]);
    return row as ICooldown;
  }

  async update(record: ICooldown): Promise<ICooldown> {
    const sql = 'UPDATE Cooldowns SET deadline = ? WHERE commandName = ? AND channelId = ?';
    const result = await this._database.run(sql, [record.deadline, record.commandName, record.channelId]);
    if (result.changes == 0) return await this.getByKeys(record.commandName, record.channelId);
    return record;
  }

  async upsert(record: ICooldown): Promise<ICooldown> {
    if (record == null) return null;
    const existing = await this.getByKeys(record.commandName, record.channelId);
    if (existing == null) {
      return await this.add(record);
    } else {
      return await this.update(record);
    }
  }

}
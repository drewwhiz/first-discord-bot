import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { IGoogleCalendarDataService } from './interfaces/IGoogleCalendarDataServce.js';
import { IGoogleCalendar } from '../models/IGoogleCalendar.js';

export class GoogleCalendarDataService implements IGoogleCalendarDataService {
    private readonly _database: Database<sqlite3.Database,sqlite3.Statement>;
    
    constructor(database: Database<sqlite3.Database,sqlite3.Statement>) {
        this._database = database;
    }

    async getAll(): Promise<IGoogleCalendar[]> {
        const sql = 'SELECT * FROM GoogleCalendars';
        const row = await this._database.get(sql);
        return row as IGoogleCalendar[];
    }

    async get(id: number): Promise<IGoogleCalendar> {
        const sql = 'SELECT * FROM GoogleCalendars WHERE id = ?';
        const row = await this._database.get(sql, [id]);
        return row as IGoogleCalendar;
    }

    async delete(id: number): Promise<boolean> {
        const sql = 'DELETE FROM GoogleCalendars WHERE id = ?';
        const row = await this._database.run(sql, [id]);
        return row.changes === 1;
    }

    async add(url: string): Promise<IGoogleCalendar> {
        const sql = 'INSERT INTO GoogleCalendars (url) VALUES (?)';
        const result = await this._database.run(sql, [url]);
        if (!result.lastID) return null;
        return await this.get(result.lastID);
    }


    async update(id: number, updatedRecord: IGoogleCalendar): Promise<IGoogleCalendar> {
        const sql = 'UPDATE GoogleCalendars SET url = ? WHERE id = ?';
        const result = await this._database.run(sql, [updatedRecord.url, id]);
        if (result.changes == 0) return await this.get(id);
        return updatedRecord;
    }
}
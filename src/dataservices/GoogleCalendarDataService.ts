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
        const results = await this._database.all(sql);
        if (results == null) return [] as IGoogleCalendar[];
        return results as IGoogleCalendar[];
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

    async add(calendarId: string): Promise<IGoogleCalendar> {
        const matching = (await this.getAll()).filter(c => c.calendarId == calendarId);
        if (matching.length > 0) return matching[0];

        const sql = 'INSERT INTO GoogleCalendars (calendarId) VALUES (?)';
        const result = await this._database.run(sql, [calendarId]);
        if (!result.lastID) return null;
        return await this.get(result.lastID);
    }


    async update(id: number, updatedRecord: IGoogleCalendar): Promise<IGoogleCalendar> {
        const sql = 'UPDATE GoogleCalendars SET calendarId = ? WHERE id = ?';
        const result = await this._database.run(sql, [updatedRecord.calendarId, id]);
        if (result.changes == 0) return await this.get(id);
        return updatedRecord;
    }
}
import { IGoogleCalendar } from '../../models/IGoogleCalendar.js';

export interface IGoogleCalendarDataService {
    add(url: string): Promise<IGoogleCalendar>;
    get(id: number): Promise<IGoogleCalendar>;
    getAll(): Promise<IGoogleCalendar[]>;
    update(id: number, updatedRecord: IGoogleCalendar): Promise<IGoogleCalendar>;
    delete(id: number): Promise<boolean>;
}

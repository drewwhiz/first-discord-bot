import { IEventSummary } from '../../models/IGoogleCalendarResponse.js';

export interface IGoogleCalendarWebService {
    reportEvents(rangeStart: Date, rangeEnd: Date): Promise<IEventSummary[]>;
}
import { IGoogleCalendarDataService } from '../dataservices/interfaces/IGoogleCalendarDataServce.js';
import { IGoogleCalendarWebService } from './interfaces/IGoogleCalendarWebService.js';

import https from 'https';
import { IEventSummary, IGoogleCalendarResponse } from '../models/IGoogleCalendarResponse.js';

export class GoogleCalendarWebService implements IGoogleCalendarWebService {
  private static readonly CALENDAR_API_BASE_URL: string = 'https://www.googleapis.com';
  private static readonly API_ENDPOINT_PREFIX: string = 'calendar/v3/calendars';
  private static readonly EVENTS_ENDPOINT: string = 'events';
  private static readonly KEY_PARAMETER: string = 'key=';

  private readonly _dataService: IGoogleCalendarDataService;

  public constructor(dataService: IGoogleCalendarDataService) {
    this._dataService = dataService;
  }

  public async reportEvents(rangeStart: Date, rangeEnd: Date): Promise<IEventSummary[]> {
    const calendars = await this._dataService.getAll();
    const results: IEventSummary[] = [];
    for (let i = 0; i < calendars.length; i++) {
      await GoogleCalendarWebService.getData(calendars[i].calendarId, (incoming: IEventSummary[]) => Array.prototype.push.apply(results, incoming));
    }

    results.sort((a, b) => a.start < b.start ? - 1 : (a.start == b.start ? 0 : 1));
    return results.filter(e => e.start.getTime() >= rangeStart.getTime() && e.start.getTime() <= rangeEnd.getTime());
  }

  private static async getData(calendarId: string, callback: (incoming: IEventSummary[]) => void) {
    const url = GoogleCalendarWebService.getCalendarApiUrl(calendarId);    
    return new Promise((resolve) => {
      const data = [];
      const results = [];
      https.get(url, res => {
        res.on('data', chunk => {
          data.push(chunk);
        });

        res.on('end', () => {
          const result = JSON.parse(Buffer.concat(data).toString()) as IGoogleCalendarResponse;
          result.items.forEach(i => {
            results.push({
              eventName: i.summary,
              created: new Date(i.created),
              updated: new Date(i.updated),
              start: i.start?.dateTime == null ? new Date(i.start?.date) : new Date(i.start?.dateTime),
              isStartDateTime: i.start?.dateTime != null,
              end: i.end?.dateTime == null ? new Date(i.end?.date) : new Date(i.end?.dateTime),
              isEndDateTime: i.end?.dateTime != null
            });
          });
          resolve(callback(results));
        });
      });
    });
  }



  private static getCalendarApiUrl(calendarId: string): string {
    return GoogleCalendarWebService.CALENDAR_API_BASE_URL
            + '/'
            + GoogleCalendarWebService.API_ENDPOINT_PREFIX
            + '/'
            + encodeURIComponent(calendarId)
            + '/'
            + GoogleCalendarWebService.EVENTS_ENDPOINT
            + '?'
            + GoogleCalendarWebService.KEY_PARAMETER
            + process.env.GOOGLE_API_KEY;
  }
}

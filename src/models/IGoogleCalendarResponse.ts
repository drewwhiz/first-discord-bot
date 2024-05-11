export interface IGoogleCalendarResponse {
    summary: string;
    updated: string;
    items: IGoogleCalendarEvent[];
}

export interface IGoogleCalendarEvent {
    summary: string;
    created: string;
    updated: string;
    start: {
        date: string;
        dateTime: string;
    };
    end: {
        date: string;
        dateTime: string;
    };
}

export interface IEventSummary {
    eventName: string;
    created: Date;
    updated: Date;
    start: Date;
    end: Date;
    isStartDateTime: boolean;
    isEndDateTime: boolean;
}
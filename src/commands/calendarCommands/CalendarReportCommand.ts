import { GuildBasedChannel, Message, TextChannel } from 'discord.js';
import { ICommand } from '../ICommand.js';
import { IGoogleCalendarWebService } from '../../webservices/interfaces/IGoogleCalendarWebService.js';
import '../../extensions/DateExtension.js';
import '../../extensions/StringExtension.js';
import { ITimeUnit } from '../../models/ITimeUnit.js';

export class CalendarReportCommand implements ICommand {
    name: string = 'List calendars';
    description: string = 'List all of the calendars being tracked';

    private readonly _service: IGoogleCalendarWebService;

    constructor(service: IGoogleCalendarWebService) {
        this._service = service;
    }

    trigger(message: Message<boolean>): boolean {
        const content: string = message.content.toLowerCase().stripPunctuation().trim();
        const args = content.split(' ');
        if (args.length > 2) return false;
        return args[0] == 'upcoming';
    }

    private static mapToTimeUnit(data: string): ITimeUnit {
        if (data == null || data.length == 0) return ITimeUnit.WEEK;
        data = data.stripPunctuation().toLowerCase().trim();
        switch (data) {
            case 'day': return ITimeUnit.DAY;
            case 'month': return ITimeUnit.MONTH;
            case 'year': return ITimeUnit.YEAR;
            case 'week': return ITimeUnit.WEEK;                
        }

        return ITimeUnit.WEEK;
    }

    private static getEndDate(startDate: Date, time: ITimeUnit): Date {
        switch (time) {
            case ITimeUnit.DAY:
                return new Date(startDate.setDate(startDate.getDate() + 1));
            case ITimeUnit.WEEK:
                return new Date(startDate.setDate(startDate.getDate() + 7));
            case ITimeUnit.MONTH:
                return new Date(startDate.setMonth(startDate.getMonth() + 1));
            case ITimeUnit.YEAR:
                return new Date(startDate.setFullYear(startDate.getFullYear() + 1));
            default: return startDate;
        }
    }

    private async buildMessage(time: ITimeUnit): Promise<string> {
        // Start right now
        const startDate = new Date();
        const endDate = CalendarReportCommand.getEndDate(new Date(), time);
        const results = await this._service.reportEvents(startDate, endDate);
        if (results.length == 0) {
            switch (time) {
                case ITimeUnit.DAY: return 'There are no events upcoming in the next day.';
                case ITimeUnit.WEEK: return 'There are no events upcoming in the next week.';
                case ITimeUnit.MONTH: return 'There are no events upcoming in the next month.';
                case ITimeUnit.YEAR: return 'There are no events upcoming in the next year.';
                default: return 'There are no events upcoming in the requested window.';
            }
        }

        const events = results.map(r => `\n- ${r.eventName}: ${r.start.getFullDateLocal()}${r.isStartDateTime ? ' at ' + r.start.getTwelveHourTimeLocal() : ''}`).join();
        switch (time) {
            case ITimeUnit.DAY: return `Here are the upcoming events for the next day (Central Time): ${events}`;
            case ITimeUnit.WEEK: return `Here are the upcoming events for the next week (Central Time): ${events}`;
            case ITimeUnit.MONTH: return `Here are the upcoming events for the next month (Central Time): ${events}`;
            case ITimeUnit.YEAR: return `Here are the upcoming events for the next year (Central Time): ${events}`;
            default: return `Here are the upcoming events requested (Central Time): ${events}`;
        }
    }

    async execute(message: Message<boolean>): Promise<void> {
        const content: string = message.content.toLowerCase().stripPunctuation().trim();
        const args = content.split(' ');
        const timeString = args.length == 2 ? args[1] : 'week';
        const timeUnit = CalendarReportCommand.mapToTimeUnit(timeString);

        message.reply(await this.buildMessage(timeUnit));
    }

    public async sendReminder(channels: GuildBasedChannel[]) : Promise<void> {
        channels.forEach(async c => {
            const textChannel = c as TextChannel;
            if (textChannel == null) return;
            textChannel.send(await this.buildMessage(ITimeUnit.WEEK));
        });
    }
}
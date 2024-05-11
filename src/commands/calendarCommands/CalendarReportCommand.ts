import { GuildBasedChannel, Message, TextChannel } from 'discord.js';
import { ICommand } from '../ICommand.js';
import { IGoogleCalendarWebService } from '../../webservices/interfaces/IGoogleCalendarWebService.js';
import '../../extensions/DateExtension.js';
import '../../extensions/StringExtension.js';

export class CalendarReportCommand implements ICommand {
    name: string = 'List calendars';
    description: string = 'List all of the calendars being tracked';

    private readonly _service: IGoogleCalendarWebService;

    constructor(service: IGoogleCalendarWebService) {
        this._service = service;
    }

    trigger(message: Message<boolean>): boolean {
        return message.content.toLowerCase().stripPunctuation().trim() == 'upcoming';
    }

    private async buildMessage(): Promise<string> {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 7);

        const results = await this._service.reportEvents(startDate, endDate);
        if (results.length == 0) {
            return 'There are no events upcoming in the next week.';
        }

        const events = results.map(r => `\n- ${r.eventName}: ${r.start.getFullDateLocal()}${r.isStartDateTime ? ' at ' + r.start.getTwelveHourTimeLocal() : ''}`).join();
        return `Here are the upcoming events for the next week (Central Time): ${events}`;
    }

    async execute(message: Message<boolean>): Promise<void> {
        message.reply(await this.buildMessage());
    }

    public async sendReminder(channels: GuildBasedChannel[]) : Promise<void> {
        channels.forEach(async c => {
            const textChannel = c as TextChannel;
            if (textChannel == null) return;
            textChannel.send(await this.buildMessage());
        });
    }
}
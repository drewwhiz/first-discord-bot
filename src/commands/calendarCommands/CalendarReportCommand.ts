import { GuildBasedChannel, Message, TextChannel } from 'discord.js';
import { ICommand } from '../ICommand.js';
import { IGoogleCalendarWebService } from '../../webservices/interfaces/IGoogleCalendarWebService.js';
import '../../extensions/DateExtension.js';
import '../../extensions/StringExtension.js';
import { ITimeUnit } from '../../models/ITimeUnit.js';

export class CalendarReportCommand implements ICommand {
  public readonly name: string = 'List calendars';
  public readonly description: string = 'List all of the calendars being tracked';

  private readonly _service: IGoogleCalendarWebService;

  public constructor(service: IGoogleCalendarWebService) {
    this._service = service;
  }

  public trigger(message: Message<boolean>): boolean {
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

  private async buildMessage(time: ITimeUnit): Promise<string[]> {
    // Start midnight today
    const startDate = new Date();
    startDate.setHours(0, 0, 0);
    const endDate = CalendarReportCommand.getEndDate(new Date(), time);
    const results = await this._service.reportEvents(startDate, endDate);
    if (results.length == 0) {
      switch (time) {
      case ITimeUnit.DAY: return ['There are no events upcoming in the next day.'];
      case ITimeUnit.WEEK: return ['There are no events upcoming in the next week.'];
      case ITimeUnit.MONTH: return ['There are no events upcoming in the next month.'];
      case ITimeUnit.YEAR: return ['There are no events upcoming in the next year.'];
      default: return ['There are no events upcoming in the requested window.'];
      }
    }

    const timezone = new Date().toLocaleDateString(undefined, { day:'2-digit', timeZoneName: 'long' }).substring(4);
    const events = results.map(r => {
      const startString = r.isStartDateTime ? ' at ' + r.start.getTwelveHourTimeLocal() : '';
      const locationString = r.location != null ? ` (at ${r.location})` : '';
      return `- ${r.eventName}: ${r.start.getFullDateLocal()}${startString}${locationString}`;
    });
    
    switch (time) {
    case ITimeUnit.DAY:
      events.unshift(`Here are the upcoming events for the next day (${timezone}):`);
      break;
    case ITimeUnit.WEEK:
      events.unshift(`Here are the upcoming events for the next week (${timezone}):`);
      break;
    case ITimeUnit.MONTH:
      events.unshift(`Here are the upcoming events for the next month (${timezone}):`);
      break;
    case ITimeUnit.YEAR:
      events.unshift(`Here are the upcoming events for the next year (${timezone}):`);
      break;
    default:
      events.unshift(`Here are the upcoming events requested (Timezone: ${timezone}):`);
      break;
    }

    return events;
  }

  private static async sendMessages(firstMessage: Message<boolean>, response: string[], textChannel: TextChannel = null): Promise<void> {
    const lines = response.length;
    let previousMessage = firstMessage;
    let reply = response[0];

    for (let i = 1; i < lines; i++) {
      const currentLength = reply.length;
      const prospectiveLength = currentLength + 1 + response[i].length;

      // Handle last line
      if (i == lines - 1) {
        if (prospectiveLength < 1900) {
          reply += '\n';
          reply += response[i];
          previousMessage = previousMessage == null ? await textChannel.send(reply) : await previousMessage.reply(reply);
        } else {
          previousMessage = previousMessage == null ? await textChannel.send(reply) : await previousMessage.reply(reply);
          reply = response[i];
          previousMessage = previousMessage == null ? await textChannel.send(reply) : await previousMessage.reply(reply);
        }

        continue;
      }

      // Current message has more room
      if (prospectiveLength < 1900) {
        reply += '\n';
        reply += response[i];
        continue;
      }

      // Send and start new message
      if (i != lines - 1) {
        previousMessage = previousMessage == null ? await textChannel.send(reply) : await previousMessage.reply(reply);
        reply = response[i];
        continue;
      }
    }

    if (previousMessage == firstMessage) {
      firstMessage == null ? await textChannel.send(reply) : await firstMessage.reply(reply);
    }
  }

  public async execute(message: Message<boolean>): Promise<void> {
    const content: string = message.content.toLowerCase().stripPunctuation().trim();
    const args = content.split(' ');
    const timeString = args.length == 2 ? args[1] : 'week';
    const timeUnit = CalendarReportCommand.mapToTimeUnit(timeString);

    const response = await this.buildMessage(timeUnit);
    if (response.length == 1) {
      message.reply(response[0]);
      return;
    }

    await CalendarReportCommand.sendMessages(message, response);
  }

  public async sendReminder(channels: GuildBasedChannel[]): Promise<void> {
    channels.forEach(async c => {
      const textChannel = c as TextChannel;
      if (textChannel == null) return;
      const response: string[] = await this.buildMessage(ITimeUnit.WEEK);
      await CalendarReportCommand.sendMessages(null, response, textChannel);
    });
  }
}
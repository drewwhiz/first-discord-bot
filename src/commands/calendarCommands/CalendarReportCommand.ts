import { GuildBasedChannel, Message, TextChannel } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import { IGoogleCalendarWebService } from '../../webservices/interfaces/IGoogleCalendarWebService.js';
import '../../extensions/DateExtension.js';
import '../../extensions/StringExtension.js';
import { ITimeUnit } from '../../models/ITimeUnit.js';

export class CalendarReportCommand implements IMessageCommand {
  public readonly name: string = 'List calendars';
  public readonly description: string = 'List all of the calendars being tracked';

  private static readonly MENTOR_EMOJI = ':hammer:';
  private static readonly UNAVAILABLE_EMOJI = ':baby_chick:';
  private static readonly STUDENT_EMOJI = ':robot:';
  private static readonly DOZER_EMOJI_NAME = 'dozer';

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

  private async buildMessage(time: ITimeUnit, requestAttendance: boolean): Promise<string[]> {
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

    let header = '';
    
    switch (time) {
    case ITimeUnit.DAY:
      header = `Here are the upcoming events for the next day (${timezone})`;
      break;
    case ITimeUnit.WEEK:
      header = `Here are the upcoming events for the next week (${timezone})`;
      break;
    case ITimeUnit.MONTH:
      header = `Here are the upcoming events for the next month (${timezone})`;
      break;
    case ITimeUnit.YEAR:
      header = `Here are the upcoming events for the next year (${timezone})`;
      break;
    default:
      header = `Here are the upcoming events requested (Timezone: ${timezone})`;
      break;
    }

    if (requestAttendance) {
      header = `@everyone ${header}.\n\nFor team activities (like meetings or outreach events), make sure to react to **each** event with ${CalendarReportCommand.STUDENT_EMOJI} if you are attending (mentors use ${CalendarReportCommand.MENTOR_EMOJI}) or ${CalendarReportCommand.UNAVAILABLE_EMOJI} if you are **not** attending.`;
    } else {
      header = `${header}:`;
    }

    events.unshift(header);
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

    const response = await this.buildMessage(timeUnit, false);
    if (response.length == 1) {
      message.reply(response[0]);
      return;
    }

    await CalendarReportCommand.sendMessages(message, response);
  }

  public async sendReminder(channels: GuildBasedChannel[]): Promise<void> {
    const response: string[] = await this.buildMessage(ITimeUnit.WEEK, true);

    channels.forEach(async c => {
      const textChannel = c as TextChannel;
      if (textChannel == null) return;

      const customEmoji = c.guild.emojis.cache.find(emoji => emoji.name === CalendarReportCommand.DOZER_EMOJI_NAME);
      let message: Message = null;
      for (let i = 0; i < response.length; i++) {
        if (message != null) {
          message = await message.reply(response[i]);
          continue;
        }

        const content = customEmoji == null 
          ? response[i] 
          : response[i].replace(
            CalendarReportCommand.STUDENT_EMOJI, 
            `<:${CalendarReportCommand.DOZER_EMOJI_NAME}:${customEmoji.id}>`
          );
        message = await textChannel.send(content);
      }
    });
  }
}
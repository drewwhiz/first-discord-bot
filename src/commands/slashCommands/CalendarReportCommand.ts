import { ChatInputCommandInteraction, Client, GuildBasedChannel, GuildEmoji, GuildScheduledEventManager, Message, SlashCommandOptionsOnlyBuilder, TextChannel } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { ITimeUnit } from '../../models/ITimeUnit.js';
import { Nullable } from '../../models/Nullable.js';

export default class CalendarReportCommand extends SlashCommand {
  private static readonly _DURATION: string = 'duration';
  private static readonly _ATTENDANCE_REQUEST: string = 'attendance_request';
  private static readonly MENTOR_EMOJI = ':hammer:';
  private static readonly UNAVAILABLE_EMOJI = ':baby_chick:';
  private static readonly STUDENT_EMOJI_NAME = 'dozer';
  private static readonly VIRTUAL_EMOJI = ':robot:';

  private readonly _eventManager: Nullable<GuildScheduledEventManager> = null;
  private readonly _studentEmoji: Nullable<GuildEmoji> = null;

  public constructor(client: Client) {
    super('upcoming', 'List upcoming events');
    if (client?.guilds == null) return;
    const guilds = client.guilds.cache.map(g => g);
    if (guilds == null || guilds.length != 1) return;
    this._eventManager = guilds[0].scheduledEvents;
    const studentEmoji = guilds[0].emojis.cache.find(emoji => emoji.name === CalendarReportCommand.STUDENT_EMOJI_NAME);
    if (studentEmoji == null) return;
    this._studentEmoji = studentEmoji;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    return (await super.build())
      .addNumberOption(option => 
        option
          .setName(CalendarReportCommand._DURATION)
          .setDescription('Length of duration')
          .setChoices(
            { name: 'year', value: ITimeUnit.YEAR },
            { name: 'month', value: ITimeUnit.MONTH },
            { name: 'week', value: ITimeUnit.WEEK },
            { name: 'day', value: ITimeUnit.DAY }
          )
          .setRequired(false))
      .addBooleanOption(option =>
        option
          .setName(CalendarReportCommand._ATTENDANCE_REQUEST)
          .setDescription('Do you want to be able to capture attendance?')
          .setRequired(false)
      )
    ;
  }

  private async buildMessage(time: ITimeUnit, requestAttendance: boolean): Promise<string[]> {
    const startDate = new Date();
    if (requestAttendance) startDate.setHours(23, 59, 59);

    let endDate = startDate;
    switch (time) {
    case ITimeUnit.DAY: endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 1)); break;
    case ITimeUnit.WEEK: endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 7)); break;
    case ITimeUnit.MONTH: endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1)); break;
    case ITimeUnit.YEAR: endDate = new Date(new Date(startDate).setFullYear(startDate.getFullYear() + 1)); break;
    }

    endDate.setHours(23, 59, 59);

    const results = 
      this._eventManager == null 
        ? [] 
        : (await this._eventManager.fetch())
          .map(e => e)
          .filter(e => e.scheduledStartAt != null && e.scheduledStartAt >= startDate && e.scheduledStartAt < endDate)
          .sort((a,b) => (a.scheduledStartTimestamp ?? 0) - (b.scheduledStartTimestamp ?? 0));
    
    if (results.length == 0) {
      switch (time) {
      case ITimeUnit.DAY: return ['There are no events upcoming in the next day.'];
      case ITimeUnit.WEEK: return ['There are no events upcoming in the next week.'];
      case ITimeUnit.MONTH: return ['There are no events upcoming in the next month.'];
      case ITimeUnit.YEAR: return ['There are no events upcoming in the next year.'];
      default: return ['There are no events upcoming in the requested window.'];
      }
    }

    const dateOption: Intl.DateTimeFormatOptions = { dateStyle: 'full' };
    const timeOption: Intl.DateTimeFormatOptions = { timeStyle: 'short' };

    const timezone = new Date().toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' }).substring(4);
    let events = results.map(r => {
      const date = r.scheduledStartAt;
      if (date == null) return null;
      const startString = `${date.toLocaleDateString('en-GB', dateOption)} at ${date.toLocaleTimeString('en-US', timeOption)}`;
      const locationString = r.entityMetadata?.location != null ? ` (${r.entityMetadata.location})` : '';
      return `- ${r.name}: ${startString}${locationString}`;
    }).filter(e => e != null);

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

    if (requestAttendance && this._studentEmoji != null) {
      header = `@everyone ${header}.\n\nFor team activities (like meetings or outreach events), make sure to react to **each** event with <:${CalendarReportCommand.STUDENT_EMOJI_NAME}:${this._studentEmoji.id}> if you are attending (mentors use ${CalendarReportCommand.MENTOR_EMOJI}), ${CalendarReportCommand.UNAVAILABLE_EMOJI} if you are **not** attending, or ${CalendarReportCommand.VIRTUAL_EMOJI} if you will be attending virtually.`;
      events = events.map(e => e.substring(2).trim());
    } else {
      header = `${header}:`;
    }

    events.unshift(header);
    return events;
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let timeUnit = interaction.options.getNumber(CalendarReportCommand._DURATION) as ITimeUnit;
    const sendAsAttendance = interaction.options.getBoolean(CalendarReportCommand._ATTENDANCE_REQUEST, false) == true;
    if (timeUnit == null) timeUnit = ITimeUnit.WEEK;

    await interaction.deferReply();

    const response = await this.buildMessage(timeUnit, sendAsAttendance);
    if (response.length == 1 && !sendAsAttendance) {
      await interaction.editReply(response[0]);
      return;
    }

    if (!sendAsAttendance) {
      await CalendarReportCommand.sendMessages(interaction, response);
    } else {
      await this.sendAsReminder(interaction, response);
    }
  }

  private static async reply(previousMessage: Nullable<ChatInputCommandInteraction | Message>, reply: string, textChannel: Nullable<TextChannel>): Promise<Nullable<ChatInputCommandInteraction | Message>> {
    if (previousMessage == null && textChannel != null) {
      return await textChannel.send(reply);
    }

    const asInteraction = previousMessage as ChatInputCommandInteraction;
    if (!asInteraction) {
      if (previousMessage == null) return null;
      return await previousMessage.reply(reply) as Message;
    }
    
    await asInteraction.followUp(reply);
    return asInteraction;
  }

  private static async sendMessages(firstMessage: ChatInputCommandInteraction, response: string[], textChannel: Nullable<TextChannel> = null): Promise<void> {
    const lines = response.length;
    let previousMessage: Nullable<ChatInputCommandInteraction | Message> = firstMessage;
    let reply = response[0];

    for (let i = 1; i < lines; i++) {
      const currentLength = reply.length;
      const prospectiveLength = currentLength + 1 + response[i].length;

      // Handle last line
      if (i == lines - 1) {
        if (prospectiveLength < 1900) {
          reply += '\n';
          reply += response[i];
        } else {
          previousMessage = await CalendarReportCommand.reply(previousMessage, reply, textChannel);
          reply = response[i];
        }

        previousMessage = await CalendarReportCommand.reply(previousMessage, reply, textChannel);
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
        previousMessage = await CalendarReportCommand.reply(previousMessage, reply, textChannel);
        reply = response[i];
        continue;
      }
    }
  }

  private async sendAsReminder(firstMessage: ChatInputCommandInteraction, response: string[]): Promise<void> {
    for (let i = 0; i < response.length; i++) {
      if (i == 0) {
        await firstMessage.editReply(response[i]);
      } else {
        await firstMessage.followUp(response[i]);
      }
    }
  }

  public async sendReminder(channels: GuildBasedChannel[]): Promise<void> {
    const response: string[] = await this.buildMessage(ITimeUnit.WEEK, true);

    channels.forEach(async c => {
      const textChannel = c as TextChannel;
      if (textChannel == null) return;

      let message: Nullable<Message> = null;
      for (let i = 0; i < response.length; i++) {
        if (message != null) {
          message = await message.reply(response[i]);
          continue;
        }

        message = await textChannel.send(response[i]);
      }
    });
  }
}
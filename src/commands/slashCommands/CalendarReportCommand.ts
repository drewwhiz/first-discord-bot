import { ChatInputCommandInteraction, Client, GuildBasedChannel, GuildScheduledEventManager, Message, SlashCommandOptionsOnlyBuilder, TextChannel } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { ITimeUnit } from '../../models/ITimeUnit.js';

export default class CalendarReportCommand extends SlashCommand {
  private static readonly _DURATION: string = 'duration';
  private static readonly MENTOR_EMOJI = ':hammer:';
  private static readonly UNAVAILABLE_EMOJI = ':baby_chick:';
  private static readonly STUDENT_EMOJI = ':robot:';
  private static readonly DOZER_EMOJI_NAME = 'dozer';

  private readonly _eventManager: GuildScheduledEventManager;

  public constructor(client: Client) {
    super('upcoming', 'List upcoming events');
    if (client?.guilds == null) return;
    const guilds = client.guilds.cache.map(g => g);
    if (guilds == null || guilds.length != 1) return;
    this._eventManager = guilds[0].scheduledEvents;
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
    ;
  }

  private async buildMessage(time: ITimeUnit, requestAttendance: boolean): Promise<string[]> {
    // Start midnight today
    const startDate = new Date();
    startDate.setHours(0, 0, 0);

    let endDate = startDate;
    switch (time) {
    case ITimeUnit.DAY: endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 1)); break;
    case ITimeUnit.WEEK: endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 7)); break;
    case ITimeUnit.MONTH: endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1)); break;
    case ITimeUnit.YEAR: endDate = new Date(new Date(startDate).setFullYear(startDate.getFullYear() + 1)); break;
    }

    const results = this._eventManager == null ? [] : (await this._eventManager.fetch()).map(e => e).filter(e => e.scheduledStartAt >= startDate && e.scheduledStartAt < endDate);
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
      const startString = `${date.toLocaleDateString('en-GB', dateOption)} at ${date.toLocaleTimeString('en-US', timeOption)}`;
      const locationString = r.entityMetadata?.location != null ? ` (${r.entityMetadata.location})` : '';
      return `- ${r.name}: ${startString}${locationString}`;
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
      events = events.map(e => e.substring(2).trim());
    } else {
      header = `${header}:`;
    }

    events.unshift(header);
    return events;
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let timeUnit = interaction.options.getNumber(CalendarReportCommand._DURATION) as ITimeUnit;
    if (timeUnit == null) timeUnit = ITimeUnit.WEEK;

    const response = await this.buildMessage(timeUnit, false);
    if (response.length == 1) {
      interaction.reply(response[0]);
      return;
    }

    await CalendarReportCommand.sendMessages(interaction, response);
  }

  private static async reply(previousMessage: ChatInputCommandInteraction | Message, reply: string, textChannel: TextChannel, isInitial: boolean): Promise<ChatInputCommandInteraction | Message> {
    if (previousMessage == null) {
      return await textChannel.send(reply);
    }

    const asInteraction = previousMessage as ChatInputCommandInteraction;
    if (!asInteraction) return await previousMessage.reply(reply) as Message;
    
    if (isInitial) {
      await asInteraction.reply(reply);
    } else {
      await asInteraction.followUp(reply);
    }

    return asInteraction;
  }

  private static async sendMessages(firstMessage: ChatInputCommandInteraction, response: string[], textChannel: TextChannel = null): Promise<void> {
    const lines = response.length;
    let previousMessage: ChatInputCommandInteraction | Message = firstMessage;
    let reply = response[0];
    let isInitial: boolean = true;

    for (let i = 1; i < lines; i++) {
      const currentLength = reply.length;
      const prospectiveLength = currentLength + 1 + response[i].length;

      // Handle last line
      if (i == lines - 1) {
        if (prospectiveLength < 1900) {
          reply += '\n';
          reply += response[i];
          previousMessage = await CalendarReportCommand.reply(previousMessage, reply, textChannel, isInitial);
          isInitial &&= false;
        } else {
          previousMessage = await CalendarReportCommand.reply(previousMessage, reply, textChannel, isInitial);
          isInitial &&= false;
          reply = response[i];
          previousMessage = await CalendarReportCommand.reply(previousMessage, reply, textChannel, isInitial);
          isInitial &&= false;
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
        previousMessage = await CalendarReportCommand.reply(previousMessage, reply, textChannel, isInitial);
        isInitial &&= false;
        reply = response[i];
        continue;
      }
    }
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
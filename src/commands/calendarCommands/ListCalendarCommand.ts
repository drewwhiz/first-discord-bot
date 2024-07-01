import { Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import { IGoogleCalendarDataService } from '../../dataservices/interfaces/IGoogleCalendarDataServce.js';

export class ListCalendarCommand implements IMessageCommand {
  public readonly name: string = 'List calendars';
  public readonly description: string = 'List all of the calendars being tracked';

  private readonly _service: IGoogleCalendarDataService;

  public constructor(service: IGoogleCalendarDataService) {
    this._service = service;
  }

  public trigger(message: Message<boolean>): boolean {
    const content = message.content.trim().toLowerCase();
    return content.startsWith('list-calendar') || content.startsWith('/list-calendar');
  }

  public async execute(message: Message<boolean>): Promise<void> {
    const member = message.member;
    if (member == null) {
      message.reply('Sorry, this action is not supported in this context.');
      return;
    }

    const calendars = await this._service.getAll();
    if (calendars.length == 0) {
      message.reply('We are not tracking any calendars at the moment!');
      return;
    }

    const replyStarter = 'We are currently tracking these calendars:';
    const lines = calendars.map(c => `\n- ${c.calendarId}`).join('');
    message.reply(replyStarter + lines);
  }
}
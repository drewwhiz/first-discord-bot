import { Message, PermissionFlagsBits } from 'discord.js';
import { ICommand } from '../ICommand.js';
import { IGoogleCalendarDataService } from '../../dataservices/interfaces/IGoogleCalendarDataServce.js';
import { readFileSync } from 'fs';

export class AddCalendarCommand implements ICommand {
  name: string = 'Add calendar';
  description: string = 'Adds a calendar to the collection';

  private readonly _service: IGoogleCalendarDataService;
  private readonly _roles: string[];

  constructor(service: IGoogleCalendarDataService) {
    this._service = service;
    this._roles = JSON.parse(readFileSync('data/calendarRoles.json').toString());;
  }

  trigger(message: Message<boolean>): boolean {
    const content = message.content.trim().toLowerCase();
    if (content.split(' ').length !== 2) return false;
    return content.startsWith('add-calendar ') || content.startsWith('/add-calendar ');
  }

  async execute(message: Message<boolean>): Promise<void> {
    const member = message.member;
    if (member == null) {
      message.reply('Sorry, this action is not supported in this context.');
      return;
    }

    const calendarId = message.content.trim().split(' ')[1].trim();

    const isAdmin = member.permissions.has(PermissionFlagsBits.Administrator);
    const hasAllowedRole = member.roles.cache.some(r => this._roles.includes(r.name));
    if (!isAdmin && !hasAllowedRole) {
      message.reply('Sorry, this action is restricted to certain users.');
      return;
    }

    const result = await this._service.add(calendarId);
    if (result == null) {
      message.reply('Unable to add the calendar at this time');
      return;
    }

    message.reply(`Tracking calendar with ID: ${calendarId}`);
  }
}
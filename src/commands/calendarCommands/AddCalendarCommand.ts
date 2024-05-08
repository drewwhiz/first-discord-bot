import { Message, PermissionFlagsBits } from 'discord.js';
import { ICommand } from '../ICommand.js';
import { IGoogleCalendarDataService } from '../../dataservices/interfaces/IGoogleCalendarDataServce.js';

export class AddCalendarCommand implements ICommand {
    name: string = 'Add calendar';
    description: string = 'Adds a calendar to the collection';

    private readonly _service: IGoogleCalendarDataService;

    constructor(service: IGoogleCalendarDataService) {
        this._service = service;
    }

    trigger(message: Message<boolean>): boolean {
        const content = message.content.trim().toLowerCase();
        if (content.split(' ').length !== 2) return false;
        return content.startsWith('add-calendar ') || content.startsWith('/add-calendar ');
    }

    async execute(message: Message<boolean>): Promise<void> {
        const url = message.content.trim().split(' ')[1];
        const member = message.member;
        if (member == null) {
            message.reply('Sorry, this action is not supported in this context.');
            return;
        }

        const isAdmin = member.permissions.has(PermissionFlagsBits.Administrator);
        const isMentor = member.roles.cache.some(r => r.name === 'Mentor');
        if (!isAdmin && !isMentor) {
            message.reply('Sorry, this action is restricted to certain users.');
            return;
        }

        const result = await this._service.add(url);
        if (result == null) {
            message.reply('Unable to add the calendar at this time');
            return;
        }

        message.reply(`Tracking calendar at: ${url}`);
    }
}
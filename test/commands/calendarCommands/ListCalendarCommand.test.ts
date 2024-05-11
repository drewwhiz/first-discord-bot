import { Message } from 'discord.js';
import { expect } from 'chai';
import { ListCalendarCommand } from '../../../src/commands/calendarCommands/ListCalendarCommand.js';

describe('List Calendar Command', () => {
    it('should trigger on /list-calendar', () => {
        const content = '/list-calendar';
        const message = Message.prototype;
        message.content = content;

        const command = new ListCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on list-calendar', () => {
        const content = 'list-calendar';
        const message = Message.prototype;
        message.content = content;

        const command = new ListCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on contains /list-calendar', () => {
        const content = 'contains /list-calendar';
        const message = Message.prototype;
        message.content = content;

        const command = new ListCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on contains list-calendar', () => {
        const content = 'contains list-calendar';
        const message = Message.prototype;
        message.content = content;

        const command = new ListCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
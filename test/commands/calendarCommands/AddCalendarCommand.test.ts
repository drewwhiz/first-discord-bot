import { Message } from 'discord.js';
import { expect } from 'chai';
import { AddCalendarCommand } from '../../../src/commands/calendarCommands/AddCalendarCommand.js';

describe('Add Calendar Command', () => {
    it('should trigger on /add-calendar with argument', () => {
        const content = '/add-calendar url';
        const message = Message.prototype;
        message.content = content;

        const command = new AddCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on add-calendar with argument', () => {
        const content = 'add-calendar url';
        const message = Message.prototype;
        message.content = content;

        const command = new AddCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on /add-calendar with arguments', () => {
        const content = '/add-calendar url 2';
        const message = Message.prototype;
        message.content = content;

        const command = new AddCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on add-calendar with arguments', () => {
        const content = 'add-calendar url 2';
        const message = Message.prototype;
        message.content = content;

        const command = new AddCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on /add-calendar', () => {
        const content = '/add-calendar';
        const message = Message.prototype;
        message.content = content;

        const command = new AddCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on add-calendar', () => {
        const content = 'add-calendar';
        const message = Message.prototype;
        message.content = content;

        const command = new AddCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on contains /add-calendar', () => {
        const content = 'contains /add-calendar';
        const message = Message.prototype;
        message.content = content;

        const command = new AddCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on contains add-calendar', () => {
        const content = 'contains add-calendar';
        const message = Message.prototype;
        message.content = content;

        const command = new AddCalendarCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
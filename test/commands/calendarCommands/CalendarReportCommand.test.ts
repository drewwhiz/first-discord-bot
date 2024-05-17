import { Message } from 'discord.js';
import { expect } from 'chai';
import { CalendarReportCommand } from '../../../src/commands/calendarCommands/CalendarReportCommand.js';

describe('Calendar Report Command', () => {
    it('should trigger on /uPcoming', () => {
        const content = '/uPcoming';
        const message = Message.prototype;
        message.content = content;

        const command = new CalendarReportCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on upcominG', () => {
        const content = 'upcominG';
        const message = Message.prototype;
        message.content = content;

        const command = new CalendarReportCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on /uPcoming data', () => {
        const content = '/uPcoming data';
        const message = Message.prototype;
        message.content = content;

        const command = new CalendarReportCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on upcominG data', () => {
        const content = 'upcominG data';
        const message = Message.prototype;
        message.content = content;

        const command = new CalendarReportCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on /uPcoming data args', () => {
        const content = '/uPcoming data args';
        const message = Message.prototype;
        message.content = content;

        const command = new CalendarReportCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on upcominG data args', () => {
        const content = 'upcominG data args';
        const message = Message.prototype;
        message.content = content;

        const command = new CalendarReportCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { CalendarReportCommand } from '../../../src/commands/utilityCommands/CalendarReportCommand.js';

describe('Calendar Report Command', function() {
  it('should trigger on /uPcoming', function() {
    const content = '/uPcoming';
    const message = Message.prototype;
    message.content = content;

    const command = new CalendarReportCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on upcominG', function() {
    const content = 'upcominG';
    const message = Message.prototype;
    message.content = content;

    const command = new CalendarReportCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on /uPcoming data', function() {
    const content = '/uPcoming data';
    const message = Message.prototype;
    message.content = content;

    const command = new CalendarReportCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on upcominG data', function() {
    const content = 'upcominG data';
    const message = Message.prototype;
    message.content = content;

    const command = new CalendarReportCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on /uPcoming data args', function() {
    const content = '/uPcoming data args';
    const message = Message.prototype;
    message.content = content;

    const command = new CalendarReportCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on upcominG data args', function() {
    const content = 'upcominG data args';
    const message = Message.prototype;
    message.content = content;

    const command = new CalendarReportCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
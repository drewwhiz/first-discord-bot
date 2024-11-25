import { Message } from 'discord.js';
import { expect } from 'chai';
import { AddCalendarCommand } from '../../../src/commands/calendarCommands/AddCalendarCommand.js';

describe('Add Calendar Command', function() {
  it('should trigger on /add-calendar with argument', function() {
    const content = '/add-calendar calendarId';
    const message = Message.prototype;
    message.content = content;

    const command = new AddCalendarCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on add-calendar with argument', function() {
    const content = 'add-calendar calendarId';
    const message = Message.prototype;
    message.content = content;

    const command = new AddCalendarCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on /add-calendar with arguments', function() {
    const content = '/add-calendar calendarId 2';
    const message = Message.prototype;
    message.content = content;

    const command = new AddCalendarCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on add-calendar with arguments', function() {
    const content = 'add-calendar calendarId 2';
    const message = Message.prototype;
    message.content = content;

    const command = new AddCalendarCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on /add-calendar', function() {
    const content = '/add-calendar';
    const message = Message.prototype;
    message.content = content;

    const command = new AddCalendarCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on add-calendar', function() {
    const content = 'add-calendar';
    const message = Message.prototype;
    message.content = content;

    const command = new AddCalendarCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on contains /add-calendar', function() {
    const content = 'contains /add-calendar';
    const message = Message.prototype;
    message.content = content;

    const command = new AddCalendarCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on contains add-calendar', function() {
    const content = 'contains add-calendar';
    const message = Message.prototype;
    message.content = content;

    const command = new AddCalendarCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
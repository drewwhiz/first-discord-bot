import { Message } from 'discord.js';
import { expect } from 'chai';
import { RemoveCalendarCommand } from '../../../src/commands/calendarCommands/RemoveCalendarCommand.js';

describe('Remove Calendar Command', function() {
  it('should trigger on /remove-calendar with argument', function() {
    const content = '/remove-calendar calendarId';
    const message = Message.prototype;
    message.content = content;

    const command = new RemoveCalendarCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on remove-calendar with argument', function() {
    const content = 'remove-calendar calendarId';
    const message = Message.prototype;
    message.content = content;

    const command = new RemoveCalendarCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on /remove-calendar with arguments', function() {
    const content = '/remove-calendar calendarId 2';
    const message = Message.prototype;
    message.content = content;

    const command = new RemoveCalendarCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on remove-calendar with arguments', function() {
    const content = 'remove-calendar calendarId 2';
    const message = Message.prototype;
    message.content = content;

    const command = new RemoveCalendarCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on /remove-calendar', function() {
    const content = '/remove-calendar';
    const message = Message.prototype;
    message.content = content;

    const command = new RemoveCalendarCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on remove-calendar', function() {
    const content = 'remove-calendar';
    const message = Message.prototype;
    message.content = content;

    const command = new RemoveCalendarCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on contains /remove-calendar', function() {
    const content = 'contains /remove-calendar';
    const message = Message.prototype;
    message.content = content;

    const command = new RemoveCalendarCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on contains remove-calendar', function() {
    const content = 'contains remove-calendar';
    const message = Message.prototype;
    message.content = content;

    const command = new RemoveCalendarCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
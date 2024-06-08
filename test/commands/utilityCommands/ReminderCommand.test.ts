import { Message } from 'discord.js';
import { ReminderCommand } from '../../../src/commands/utilityCommands/ReminderCommand.js';
import { expect } from 'chai';

describe('Remidner Command', function () {
  it('should trigger on !remindme', function () {
    const content = '!remindme';
    const message = Message.prototype;
    message.content = content;
    const command = new ReminderCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on !remindme help', function () {
    const content = '!remindme help';
    const message = Message.prototype;
    message.content = content;
    const command = new ReminderCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on remindme', function () {
    const content = 'remindme';
    const message = Message.prototype;
    message.content = content;
    const command = new ReminderCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on something !remindme', function () {
    const content = 'something !remindme';
    const message = Message.prototype;
    message.content = content;
    const command = new ReminderCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
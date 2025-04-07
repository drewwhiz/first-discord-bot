/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { ConvertUnitCommand } from '../../../src/commands/utilityCommands/ConvertUnitCommand.js';

describe('Convert Unit Command', function() {
  it('should trigger on convert * * to *', function() {
    const content = 'convert RANDOM RANDOM to RANDOM';
    const message = Message.prototype;
    message.content = content;
    const command = new ConvertUnitCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on convert * to *', function() {
    const content = 'convert RANDOM to RANDOM';
    const message = Message.prototype;
    message.content = content;
    const command = new ConvertUnitCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on convert help', function() {
    const content = 'convert help';
    const message = Message.prototype;
    message.content = content;
    const command = new ConvertUnitCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on convert help something', function() {
    const content = 'convert help something';
    const message = Message.prototype;
    message.content = content;
    const command = new ConvertUnitCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on message containing convert', function() {
    const content = 'I want to convert';
    const message = Message.prototype;
    message.content = content;
    const command = new ConvertUnitCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on message starting with convert', function() {
    const content = 'convert pls';
    const message = Message.prototype;
    message.content = content;
    const command = new ConvertUnitCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on message containing to', function() {
    const content = 'I want to do something';
    const message = Message.prototype;
    message.content = content;
    const command = new ConvertUnitCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
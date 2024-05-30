import { Message } from 'discord.js';
import { expect } from 'chai';
import { GoodBotBadBotCommand } from '../../../src/commands/funCommands/GoodBotBadBotCommand.js';

describe('Good Bot Bad Bot Command', function() {
  it('should trigger on gooD Bot', function() {
    const content = 'gooD Bot';
    const message = Message.prototype;
    message.content = content;
    const command = new GoodBotBadBotCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on gooDBot', function() {
    const content = 'gooDBot';
    const message = Message.prototype;
    message.content = content;
    const command = new GoodBotBadBotCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on bad BOT', function() {
    const content = 'bad BOT';
    const message = Message.prototype;
    message.content = content;
    const command = new GoodBotBadBotCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on baD-Bot', function() {
    const content = 'baD-Bot';
    const message = Message.prototype;
    message.content = content;
    const command = new GoodBotBadBotCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on gooD-Bot', function() {
    const content = 'gooD-Bot';
    const message = Message.prototype;
    message.content = content;
    const command = new GoodBotBadBotCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on more than bad bot', function() {
    const content = 'baD-Bot and some';
    const message = Message.prototype;
    message.content = content;
    const command = new GoodBotBadBotCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on more than good bot', function() {
    const content = 'gooD bot and some';
    const message = Message.prototype;
    message.content = content;
    const command = new GoodBotBadBotCommand(null);
    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
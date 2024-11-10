import { Message } from 'discord.js';
import { expect } from 'chai';
import { WeatherCommand } from '../../../src/commands/utilityCommands/WeatherCommand.js';

describe('Weather Command', function () {
  it('should trigger on weather', function () {
    const content = 'weather';
    const message = Message.prototype;
    message.content = content;
    const command = new WeatherCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on weather zip5', function () {
    const content = 'weather 00000';
    const message = Message.prototype;
    message.content = content;
    const command = new WeatherCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on weather zip9', function () {
    const content = 'weather 00000-0000';
    const message = Message.prototype;
    message.content = content;
    const command = new WeatherCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on weather random', function () {
    const content = 'weather 123';
    const message = Message.prototype;
    message.content = content;
    const command = new WeatherCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on weather inside text', function () {
    const content = 'and more weather 00000-0000';
    const message = Message.prototype;
    message.content = content;
    const command = new WeatherCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
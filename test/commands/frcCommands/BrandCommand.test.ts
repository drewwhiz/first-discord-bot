import { Message } from 'discord.js';
import { expect } from 'chai';
import { BrandCommand } from '../../../src/commands/frcCommands/BrandCommand.js';

describe('Brand Command', function () {
  it('should trigger on brand and something', function () {
    const content = 'brand something';
    const message = Message.prototype;
    message.content = content;
    const command = new BrandCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on brand alone', function () {
    const content = 'brand';
    const message = Message.prototype;
    message.content = content;
    const command = new BrandCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on brands', function () {
    const content = 'brands';
    const message = Message.prototype;
    message.content = content;
    const command = new BrandCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
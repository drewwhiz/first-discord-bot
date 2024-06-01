import { Message } from 'discord.js';
import { expect } from 'chai';
import { MagicEightBallCommand } from '../../../src/commands/utilityCommands/MagicEightBallCommand.js';

describe('Magic 8 Ball Command', function() {
  it('should trigger on magic 8 ball', function() {
    const content = 'magic 8 ball, what should I do';
    const message = Message.prototype;
    message.content = content;
    const command = new MagicEightBallCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on magic 8 ball alone', function() {
    const content = 'magic 8 ball';
    const message = Message.prototype;
    message.content = content;
    const command = new MagicEightBallCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on magic eight ball', function() {
    const content = 'magic eight ball, what should I do';
    const message = Message.prototype;
    message.content = content;
    const command = new MagicEightBallCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on magic eight ball alone', function() {
    const content = 'magic eight ball';
    const message = Message.prototype;
    message.content = content;
    const command = new MagicEightBallCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger without phrase', function() {
    const content = 'what should I do';
    const message = Message.prototype;
    message.content = content;
    const command = new MagicEightBallCommand(null);

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
import { Message } from 'discord.js';
import { expect } from 'chai';
import { WompCommand } from '../../../src/commands/funCommands/WompCommand.js';

describe('Womp Command', function() {
  it('should trigger on womp', function() {
    const content = 'woMP';
    const message = Message.prototype;
    message.content = content;
    const command = new WompCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on womp!', function() {
    const content = 'womp!';
    const message = Message.prototype;
    message.content = content;
    const command = new WompCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on womp womp', function() {
    const content = 'womp WOMP';
    const message = Message.prototype;
    message.content = content;
    const command = new WompCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on womp and more', function() {
    const content = 'womp and more';
    const message = Message.prototype;
    message.content = content;
    const command = new WompCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
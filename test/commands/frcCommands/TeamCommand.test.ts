import { Message } from 'discord.js';
import { expect } from 'chai';
import { TeamCommand } from '../../../src/commands/frcCommands/TeamCommand.js';

describe('Team Command', function() {
  it('should trigger on positive number', function() {
    const content = '1';
    const message = Message.prototype;
    message.content = content;
    const command = new TeamCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on zero number', function() {
    const content = '0';
    const message = Message.prototype;
    message.content = content;
    const command = new TeamCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on negative number', function() {
    const content = '-1';
    const message = Message.prototype;
    message.content = content;
    const command = new TeamCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on decimal number', function() {
    const content = '1.0';
    const message = Message.prototype;
    message.content = content;
    const command = new TeamCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on non-US decimal number', function() {
    const content = '1,0';
    const message = Message.prototype;
    message.content = content;
    const command = new TeamCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
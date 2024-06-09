import { Message } from 'discord.js';
import { expect } from 'chai';
import { LolCommand } from '../../../src/commands/funCommands/LolCommand.js';

describe('Lol Command', function() {
  it('should trigger on lol', function() {
    const content = 'lol';
    const message = Message.prototype;
    message.content = content;
    const command = new LolCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on lol!', function() {
    const content = 'lol!';
    const message = Message.prototype;
    message.content = content;
    const command = new LolCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on lollipop', function() {
    const content = 'lollipop';
    const message = Message.prototype;
    message.content = content;
    const command = new LolCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on LoLoL', function() {
    const content = 'LoLoL';
    const message = Message.prototype;
    message.content = content;
    const command = new LolCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });
});
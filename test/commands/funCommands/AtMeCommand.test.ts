import { Message } from 'discord.js';
import { expect } from 'chai';
import { AtMeCommand } from '../../../src/commands/funCommands/AtMeCommand.js';

describe('At Me Command', function() {
  it('should trigger on mention', function() {
    const userId = 'USER0';
    const command = new AtMeCommand(userId);

    const message = Message.prototype;
    message.content = `<@!${userId}>`;

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on mention without !', function() {
    const userId = 'USER0';
    const command = new AtMeCommand(userId);

    const message = Message.prototype;
    message.content = `<@${userId}>`;

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on mention in content', function() {
    const userId = 'USER0';
    const command = new AtMeCommand(userId);

    const message = Message.prototype;
    message.content = `hey <@${userId}> what's up`;

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on wrong mention', function() {
    const userId = 'USER0';
    const command = new AtMeCommand(userId);

    const message = Message.prototype;
    message.content = 'hey <@USER1> what\'s up';

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
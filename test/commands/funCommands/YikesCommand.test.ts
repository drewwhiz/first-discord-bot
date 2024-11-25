import { Message } from 'discord.js';
import { expect } from 'chai';
import { YikesCommand } from '../../../src/commands/funCommands/YikesCommand.js';

describe('Yikes Command', function() {
  it('should trigger on \'yikes\'', function() {
    const content = 'yIkEs';
    const message = Message.prototype;
    message.content = content;
    const command = new YikesCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on message with other words', function() {
    const content = 'yIkEs is the key word for this command';
    const message = Message.prototype;
    message.content = content;
    const command = new YikesCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

});
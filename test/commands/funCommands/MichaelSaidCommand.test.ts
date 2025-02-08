import { Message } from 'discord.js';
import { expect } from 'chai';
import { MichaelSaidCommand } from '../../../src/commands/funCommands/MichaelSaidCommand.js';

describe('Michael Said Command', function() {
  it('should trigger on \'michael said\'', function() {
    const content = 'Michael said';
    const message = Message.prototype;
    message.content = content;
    const command = new MichaelSaidCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on \'michael. said\'', function() {
    const content = 'Michael. said';
    const message = Message.prototype;
    message.content = content;
    const command = new MichaelSaidCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
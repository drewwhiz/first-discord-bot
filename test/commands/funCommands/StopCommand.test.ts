/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { StopCommand } from '../../../src/commands/funCommands/StopCommand.js';
import { expect } from 'chai';

describe('Stop Command', function() {
  it('should trigger on \'Stop\'', function() {
    const content = 'Stop';
    const message = Message.prototype;
    message.content = content;
    const command = new StopCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on \'i Stop\'', function() {
    const content = 'i Stop';
    const message = Message.prototype;
    message.content = content;
    const command = new StopCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on \'Stop?\'', function() {
    const content = 'Stop?';
    const message = Message.prototype;
    message.content = content;
    const command = new StopCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on \'Stopter\'', function() {
    const content = 'Stopter';
    const message = Message.prototype;
    message.content = content;
    const command = new StopCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
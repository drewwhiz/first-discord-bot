/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { StrutCommand } from '../../../src/commands/funCommands/StrutCommand.js';

describe('Strut Command', function () {
  it('should trigger on guntersville', function () {
    const content = 'guntersville';
    const message = Message.prototype;
    message.content = content;
    const command = new StrutCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on new hope', function () {
    const content = 'New Hope';
    const message = Message.prototype;
    message.content = content;
    const command = new StrutCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on newhope', function () {
    const content = 'newhope';
    const message = Message.prototype;
    message.content = content;
    const command = new StrutCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
import { Message } from 'discord.js';
import { expect } from 'chai';
import { PoopCommand } from '../../../src/commands/funCommands/PoopCommand.js';

describe('Poop Command', function () {
  it('should trigger on 💩', function () {
    const content = '💩';
    const message = Message.prototype;
    message.content = content;
    const command = new PoopCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger without 💩', function () {
    const content = 'no poop here';
    const message = Message.prototype;
    message.content = content;
    const command = new PoopCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { ImagineCommand } from '../../../src/commands/funCommands/ImagineCommand.js';

describe('Imagine Command', function() {
  it('should trigger on starting with imagine', function() {
    const content = 'IMAGINE my surprise';
    const message = Message.prototype;
    message.content = content;
    const command = new ImagineCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger without imagine', function() {
    const content = 'this phrase doesn\'t have it';
    const message = Message.prototype;
    message.content = content;
    const command = new ImagineCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger without imagine starting', function() {
    const content = 'this phrase has imagine in the wrong place';
    const message = Message.prototype;
    message.content = content;
    const command = new ImagineCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
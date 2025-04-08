/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { PartLookupCommand } from '../../../src/commands/frcCommands/PartLookupCommand.js';

describe('Part Lookup Command', function() {
  it('should trigger on AM', function() {
    const content = 'AM-1';
    const message = Message.prototype;
    message.content = content;

    const command = new PartLookupCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on REV', function() {
    const content = 'REV-1';
    const message = Message.prototype;
    message.content = content;

    const command = new PartLookupCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on WCP', function() {
    const content = 'WCP-1';
    const message = Message.prototype;
    message.content = content;

    const command = new PartLookupCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on prefix only', function() {
    const content = 'WCP-';
    const message = Message.prototype;
    message.content = content;

    const command = new PartLookupCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on no prefix', function() {
    const content = 'W C P - 1';
    const message = Message.prototype;
    message.content = content;

    const command = new PartLookupCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
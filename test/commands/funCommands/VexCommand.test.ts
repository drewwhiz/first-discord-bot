/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { VexCommand } from '../../../src/commands/funCommands/VexCommand.js';

describe('Vex Command', function () {
  it('should trigger on vex', function () {
    const content = 'vex';
    const message = Message.prototype;
    message.content = content;
    const command = new VexCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on vex with other words', function () {
    const content = 'I feel strongly about vex and other things';
    const message = Message.prototype;
    message.content = content;
    const command = new VexCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on vexing', function () {
    const content = 'vexing';
    const message = Message.prototype;
    message.content = content;
    const command = new VexCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
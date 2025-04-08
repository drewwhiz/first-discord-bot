/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { HearMeOutCommand } from '../../../src/commands/funCommands/HearMeOutCommand.js';

describe('Bonk Command', function() {
  it('should trigger on \'hear me out\'', function() {
    const content = 'HeAr Me OuT';
    const message = Message.prototype;
    message.content = content;
    const command = new HearMeOutCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'hear me out\' in 30 character message', function() {
    const content = '1111111111111111111HeAr Me OuT';
    const message = Message.prototype;
    message.content = content;
    const command = new HearMeOutCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on \'hear me out\' in 31 character message', function() {
    const content = '11111111111111111111HeAr Me OuT';
    const message = Message.prototype;
    message.content = content;
    const command = new HearMeOutCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger without key phrase', function() {
    const content = 'hear does not me have out it';
    const message = Message.prototype;
    message.content = content;
    const command = new HearMeOutCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
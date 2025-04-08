/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { ChiefDelphiCommand } from '../../../src/commands/frcCommands/ChiefDelphiCommand.js';

describe('Chief Delphi Command', function() {
  it('should trigger on message starting with /cd', function() {
    const content = '/CD pls';
    const message = Message.prototype;
    message.content = content;

    const command = new ChiefDelphiCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on message starting with cd', function() {
    const content = 'Cd pls';
    const message = Message.prototype;
    message.content = content;

    const command = new ChiefDelphiCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on message starting with cd:', function() {
    const content = 'Cd: pls';
    const message = Message.prototype;
    message.content = content;

    const command = new ChiefDelphiCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on message starting with cd: with extra space', function() {
    const content = 'Cd:        pls';
    const message = Message.prototype;
    message.content = content;

    const command = new ChiefDelphiCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on message only cd', function() {
    const content = 'Cd:  ';
    const message = Message.prototype;
    message.content = content;

    const command = new ChiefDelphiCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on message only cd with leading space', function() {
    const content = '     Cd:  ';
    const message = Message.prototype;
    message.content = content;

    const command = new ChiefDelphiCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on message without cd', function() {
    const content = 'c d:  ';
    const message = Message.prototype;
    message.content = content;

    const command = new ChiefDelphiCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { RandomCommand } from '../../../src/commands/utilityCommands/RandomCommand.js';
import { RandomNumberService } from '../../../src/services/RandomNumberService.js';

describe('Random Command', function() {
  it('should trigger on fLip', function() {
    const content = 'fLip';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on /flip', function() {
    const content = '/flip';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on RolL', function() {
    const content = 'RolL';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on flip 4', function() {
    const content = 'flip 4';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on flip a', function() {
    const content = 'flip a';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on roll 4', function() {
    const content = 'roll 4';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on roll a', function() {
    const content = 'roll a';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on flip 4 5', function() {
    const content = 'flip 4 5';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on roll 4 5', function() {
    const content = 'roll 4 5';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on roll 4 a', function() {
    const content = 'roll 4 a';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on roll 4 5 6', function() {
    const content = 'roll 4 5 6';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on roll d4', function() {
    const content = 'roll d4';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on roll d4 5', function() {
    const content = 'roll d4 5';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on roll d5', function() {
    const content = 'roll d5';
    const message = Message.prototype;
    message.content = content;
    const command = new RandomCommand(new RandomNumberService(), null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
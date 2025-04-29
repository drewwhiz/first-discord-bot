/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { BonkCommand } from '../../../src/commands/funCommands/BonkCommand.js';

describe('Bonk Command', function() {
  it('should not trigger on \'event\'', function() {
    const content = 'event';
    const message = Message.prototype;
    message.content = content;
    const command = new BonkCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on \'events\'', function() {
    const content = 'events';
    const message = Message.prototype;
    message.content = content;
    const command = new BonkCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on \'dual\'', function() {
    const content = 'dual';
    const message = Message.prototype;
    message.content = content;
    const command = new BonkCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on \'double\'', function() {
    const content = 'double';
    const message = Message.prototype;
    message.content = content;
    const command = new BonkCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on \'triple\'', function() {
    const content = 'triple';
    const message = Message.prototype;
    message.content = content;
    const command = new BonkCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on \'quadruple\'', function() {
    const content = 'quadruple';
    const message = Message.prototype;
    message.content = content;
    const command = new BonkCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on \'ftc and swerve\'', function() {
    const content = 'ftc or frc swerve drive';
    const message = Message.prototype;
    message.content = content;
    const command = new BonkCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { RoshamboCommand } from '../../../src/commands/sillyCommands/RoshamboCommand.js';

describe('Roshambo Command', function () {
  it('should trigger on 🪨', function () {
    const content = '🪨';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on 🗿', function () {
    const content = '🗿';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on ✂', function () {
    const content = '✂';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on ✄', function () {
    const content = '✄';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on ✃', function () {
    const content = '✃';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on ✁', function () {
    const content = '✁';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on ✂️', function () {
    const content = '✂️';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });













  it('should trigger on 🗞️', function () {
    const content = '🗞️';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on 📰', function () {
    const content = '📰';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on 📜', function () {
    const content = '📜';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on 📑', function () {
    const content = '📑';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on 📃', function () {
    const content = '📃';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on 📝', function () {
    const content = '📝';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on 📄', function () {
    const content = '📄';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on generic message', function () {
    const content = 'how you all doin tonight';
    const message = Message.prototype;
    message.content = content;
    const command = new RoshamboCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
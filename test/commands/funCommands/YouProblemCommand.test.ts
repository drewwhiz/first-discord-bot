/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { YouProblemCommand } from '../../../src/commands/funCommands/YouProblemCommand.js';

describe('You Problem Command', function () {
  it('should trigger on i hate', function () {
    const content = 'i hate vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on i dislike', function () {
    const content = 'i dislike vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on i don\'t like', function () {
    const content = 'i don\'t like vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on i detest', function () {
    const content = 'i detest vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on i abhor', function () {
    const content = 'i abhor vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on i despise', function () {
    const content = 'i despise vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on i disapprove of', function () {
    const content = 'i disapprove of vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on i loathe', function () {
    const content = 'i loathe vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on i resent', function () {
    const content = 'i resent vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on you hate', function () {
    const content = 'do you hate vegetables';
    const message = Message.prototype;
    message.content = content;
    const command = new YouProblemCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

});
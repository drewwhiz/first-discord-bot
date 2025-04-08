/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { DocumentationCommand } from '../../../src/commands/frcCommands/DocumentationCommand.js';

describe('Documentation Command', function() {
  it('should trigger on message starting with /docs', function() {
    const content = '/docs pls';
    const message = Message.prototype;
    message.content = content;

    const command = new DocumentationCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on message starting with /doc', function() {
    const content = '/doc pls';
    const message = Message.prototype;
    message.content = content;

    const command = new DocumentationCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on message starting with docs', function() {
    const content = 'docs pls';
    const message = Message.prototype;
    message.content = content;

    const command = new DocumentationCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on message starting with doc', function() {
    const content = 'doc pls';
    const message = Message.prototype;
    message.content = content;

    const command = new DocumentationCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on message without doc', function() {
    const content = 'doctor pls';
    const message = Message.prototype;
    message.content = content;

    const command = new DocumentationCommand(null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
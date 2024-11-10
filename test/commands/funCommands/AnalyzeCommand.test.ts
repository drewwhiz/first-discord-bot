import { Message } from 'discord.js';
import { expect } from 'chai';
import { AnalyzeCommand } from '../../../src/commands/funCommands/AnalyzeCommand.js';

describe('Analyze Command', function () {
  it('should trigger on starting with analyze', function () {
    const content = '/analyze';
    const message = Message.prototype;
    message.content = content;
    const command = new AnalyzeCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on containing analyze', function () {
    const content = 'I want to analyze';
    const message = Message.prototype;
    message.content = content;
    const command = new AnalyzeCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on starting with read', function () {
    const content = '/read';
    const message = Message.prototype;
    message.content = content;
    const command = new AnalyzeCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on containing read', function () {
    const content = 'I want to read';
    const message = Message.prototype;
    message.content = content;
    const command = new AnalyzeCommand(null, null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

});
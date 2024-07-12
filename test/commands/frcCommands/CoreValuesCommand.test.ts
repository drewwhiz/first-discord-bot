import { Message } from 'discord.js';
import { expect } from 'chai';
import { CoreValuesCommand } from '../../../src/commands/frcCommands/CoreValuesCommand.js';

describe('Core Values Command', function() {
  it('should trigger on \'discovery\'', function() {
    const content = 'discovery';
    const message = Message.prototype;
    message.content = content;
    const command = new CoreValuesCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'innovation\'', function() {
    const content = 'innovation';
    const message = Message.prototype;
    message.content = content;
    const command = new CoreValuesCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'impact\'', function() {
    const content = 'inclusion';
    const message = Message.prototype;
    message.content = content;
    const command = new CoreValuesCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'teamwork\'', function() {
    const content = 'teamwork';
    const message = Message.prototype;
    message.content = content;
    const command = new CoreValuesCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'fun\'', function() {
    const content = 'fun';
    const message = Message.prototype;
    message.content = content;
    const command = new CoreValuesCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'gp\'', function() {
    const content = 'gp';
    const message = Message.prototype;
    message.content = content;
    const command = new CoreValuesCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'cv\'', function() {
    const content = 'innovation';
    const message = Message.prototype;
    message.content = content;
    const command = new CoreValuesCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on \'discover\'', function() {
    const content = 'discover';
    const message = Message.prototype;
    message.content = content;
    const command = new CoreValuesCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
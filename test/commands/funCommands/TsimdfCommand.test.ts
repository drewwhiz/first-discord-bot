import { Message } from 'discord.js';
import { expect } from 'chai';
import { TsimfdCommand } from '../../../src/commands/funCommands/TsimfdCommand.js';

describe('TSIMFD Command', function() {
  it('should trigger on \'cool\'', function() {
    const content = 'this message includes CoOl and other words';
    const message = Message.prototype;
    message.content = content;
    const command = new TsimfdCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'awesome\'', function() {
    const content = 'this message includes AwEsOmE and other words';
    const message = Message.prototype;
    message.content = content;
    const command = new TsimfdCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'neat\'', function() {
    const content = 'this message includes nEaT and other words';
    const message = Message.prototype;
    message.content = content;
    const command = new TsimfdCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'dope\'', function() {
    const content = 'this message includes dOpE and other words';
    const message = Message.prototype;
    message.content = content;
    const command = new TsimfdCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on \'coolest\'', function() {
    const content = 'this message includes coolest and other words';
    const message = Message.prototype;
    message.content = content;
    const command = new TsimfdCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
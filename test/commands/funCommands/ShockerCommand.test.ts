import { Message } from 'discord.js';
import { expect } from 'chai';
import { ShockerCommand } from '../../../src/commands/funCommands/ShockerCommand.js';

describe('Shocker Command', function () {
  it('should trigger on \'shocker\'', function () {
    const content = 'SHOCKER';
    const message = Message.prototype;
    message.content = content;
    const command = new ShockerCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on message with shocker', function () {
    const content = 'Shocker😑';
    const message = Message.prototype;
    message.content = content;
    const command = new ShockerCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on \'shocks\'', function () {
    const content = 'shocks';
    const message = Message.prototype;
    message.content = content;
    const command = new ShockerCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });
});
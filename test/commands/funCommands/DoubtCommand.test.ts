import { Message, TextChannel } from 'discord.js';
import { expect } from 'chai';
import { DoubtCommand } from '../../../src/commands/funCommands/DoubtCommand.js';
import * as TypeMoq from 'typemoq';

describe('Doubt Command', function() {
  it('should trigger on X', function() {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'x');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new DoubtCommand(null);
    const result = command.trigger(mock.object);
    expect(result).to.be.true;
  });

  it('should not trigger on aX', function() {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'Ax');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new DoubtCommand(null);
    const result = command.trigger(mock.object);
    expect(result).to.be.false;
  });
});
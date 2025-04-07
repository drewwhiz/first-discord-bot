/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message, TextChannel } from 'discord.js';
import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import { RespectsCommand } from '../../../src/commands/funCommands/RespectsCommand.js';

describe('Respect Command', function () {
  it('should trigger on F', function () {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'f');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new RespectsCommand(null, null);
    const result = command.messageTrigger(mock.object);
    expect(result).to.be.true;
  });

  it('should not trigger on aF', function () {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'Af');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new RespectsCommand(null, null);
    const result = command.messageTrigger(mock.object);
    expect(result).to.be.false;
  });
});
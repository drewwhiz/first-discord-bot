/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message, TextChannel } from 'discord.js';
import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import { GameCommand } from '../../../src/commands/funCommands/GameCommand.js';

describe('Game Command', function() {
  it('should trigger on message with game', function() {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'this message includes gAMe and other words');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new GameCommand(null, null);
    const result = command.messageTrigger(mock.object);
    expect(result).to.be.true;
  });

  it('should trigger on message with games', function() {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'this message includes games and other words');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new GameCommand(null, null);
    const result = command.messageTrigger(mock.object);
    expect(result).to.be.true;
  });

  it('should not trigger on message with gamestop', function() {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'this message includes gamestop and other words');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new GameCommand(null, null);
    const result = command.messageTrigger(mock.object);
    expect(result).to.be.false;
  });
});
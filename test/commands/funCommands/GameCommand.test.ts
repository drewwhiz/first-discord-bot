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

    const command = new GameCommand();
    const result = command.trigger(mock.object);
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

    const command = new GameCommand();
    const result = command.trigger(mock.object);
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

    const command = new GameCommand();
    const result = command.trigger(mock.object);
    expect(result).to.be.false;
  });

  it('should not trigger in cooldown', function() {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'game');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new GameCommand();

    const result = command.trigger(mock.object);
    expect(result).to.be.true;

    const secondResult = command.trigger(mock.object);
    expect(secondResult).to.be.false;
  });

  it('should trigger in cooldown on another channel', function() {
    const firstMock = TypeMoq.Mock.ofType<Message>();
    firstMock.setup(m => m.content).returns(() => 'game');
    firstMock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new GameCommand();

    const firstResult = command.trigger(firstMock.object);
    expect(firstResult).to.be.true;

    const secondMock = TypeMoq.Mock.ofType<Message>();
    secondMock.setup(m => m.content).returns(() => 'game');
    secondMock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '2';
      return channel;
    });

    const secondResult = command.trigger(secondMock.object);
    expect(secondResult).to.be.true;
  });
});
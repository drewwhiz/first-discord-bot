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

    const command = new DoubtCommand();
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

    const command = new DoubtCommand();
    const result = command.trigger(mock.object);
    expect(result).to.be.false;
  });

  it('should not trigger in cooldown', function() {
    const mock = TypeMoq.Mock.ofType<Message>();
    mock.setup(m => m.content).returns(() => 'x');
    mock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new DoubtCommand();

    const result = command.trigger(mock.object);
    expect(result).to.be.true;

    const secondResult = command.trigger(mock.object);
    expect(secondResult).to.be.false;
  });

  it('should trigger in cooldown on another channel', function() {
    const firstMock = TypeMoq.Mock.ofType<Message>();
    firstMock.setup(m => m.content).returns(() => 'x');
    firstMock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '1';
      return channel;
    });

    const command = new DoubtCommand();

    const firstResult = command.trigger(firstMock.object);
    expect(firstResult).to.be.true;

    const secondMock = TypeMoq.Mock.ofType<Message>();
    secondMock.setup(m => m.content).returns(() => 'x');
    secondMock.setup(m => m.channel).returns(() => {
      const channel = TextChannel.prototype;
      channel.id = '2';
      return channel;
    });

    const secondResult = command.trigger(secondMock.object);
    expect(secondResult).to.be.true;
  });
});
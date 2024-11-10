import { Message, MessageMentions } from 'discord.js';
import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import { EveryoneCommand } from '../../../src/commands/funCommands/EveryoneCommand.js';


describe('Everyone Command', function() {
  it('should trigger on messages where everyone is tagged', function() {
    const mentions = TypeMoq.Mock.ofType<MessageMentions>();
    mentions.setup(m => m.everyone).returns(() => true);

    const message = TypeMoq.Mock.ofType<Message>();
    message.setup(m => m.mentions).returns(() => mentions.object);

    const command = new EveryoneCommand(null);
    const result = command.messageTrigger(message.object);
    expect(result).to.be.true;
  });

  it('should not trigger on messages where everyone is not tagged', function() {
    const mentions = TypeMoq.Mock.ofType<MessageMentions>();
    mentions.setup(m => m.everyone).returns(() => false);

    const message = TypeMoq.Mock.ofType<Message>();
    message.setup(m => m.mentions).returns(() => mentions.object);

    const command = new EveryoneCommand(null);
    const result = command.messageTrigger(message.object);
    expect(result).to.be.false;
  });
});
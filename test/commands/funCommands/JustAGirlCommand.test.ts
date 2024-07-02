import { Collection, Message, MessageReaction, ReactionEmoji, ReactionManager, User } from 'discord.js';
import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import { JustAGirlCommand } from '../../../src/commands/funCommands/JustAGirlCommand.js';


describe('Just A Girl Command', function () {
  it('should trigger on first negative emoji', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '🤬');

    const author = TypeMoq.Mock.ofType<User>();
    author.setup(m => m.id).returns(() => 'bot id');

    const message = TypeMoq.Mock.ofType<Message>();
    message.setup(m => m.author).returns(() => author.object);

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 1);
    reaction.setup(m => m.emoji).returns(() => emoji.object);
    reaction.setup(m => m.message).returns(() => message.object);

    const reactionCache: Collection<string, MessageReaction> = new Collection<string, MessageReaction>(
      [
        ['a', reaction.object]
      ]
    );

    const reactions = TypeMoq.Mock.ofType<ReactionManager>();
    reactions.setup(m => m.cache).returns(() => reactionCache);

    message.setup(m => m.reactions).returns(() => reactions.object);

    const command = new JustAGirlCommand('bot id');
    const result = command.trigger(reaction.object);
    expect(result).to.be.true;
  });

  it('should not trigger on first non-negative emoji', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '🤣');

    const author = TypeMoq.Mock.ofType<User>();
    author.setup(m => m.id).returns(() => 'bot id');

    const message = TypeMoq.Mock.ofType<Message>();
    message.setup(m => m.author).returns(() => author.object);

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 1);
    reaction.setup(m => m.emoji).returns(() => emoji.object);
    reaction.setup(m => m.message).returns(() => message.object);

    const command = new JustAGirlCommand('bot id');
    const result = command.trigger(reaction.object);
    expect(result).to.be.false;
  });

  it('should trigger on first negative emoji when there are other emoji', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '🤬');

    const author = TypeMoq.Mock.ofType<User>();
    author.setup(m => m.id).returns(() => 'bot id');

    const message = TypeMoq.Mock.ofType<Message>();
    message.setup(m => m.author).returns(() => author.object);

    const existingEmoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    existingEmoji.setup(m => m.name).returns(() => '🤣');

    const existingReaction = TypeMoq.Mock.ofType<MessageReaction>();
    existingReaction.setup(m => m.count).returns(() => 1);
    existingReaction.setup(m => m.emoji).returns(() => existingEmoji.object);
    existingReaction.setup(m => m.message).returns(() => message.object);

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 1);
    reaction.setup(m => m.emoji).returns(() => emoji.object);
    reaction.setup(m => m.message).returns(() => message.object);

    const reactionCache: Collection<string, MessageReaction> = new Collection<string, MessageReaction>(
      [
        ['a', reaction.object],
        ['b', existingReaction.object]
      ]
    );
    const reactions = TypeMoq.Mock.ofType<ReactionManager>();
    reactions.setup(m => m.cache).returns(() => reactionCache);

    message.setup(m => m.reactions).returns(() => reactions.object);

    const command = new JustAGirlCommand('bot id');
    const result = command.trigger(reaction.object);
    expect(result).to.be.true;
  });

  it('should not trigger on second (different) negative emoji', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '🤬');

    const author = TypeMoq.Mock.ofType<User>();
    author.setup(m => m.id).returns(() => 'bot id');

    const message = TypeMoq.Mock.ofType<Message>();
    message.setup(m => m.author).returns(() => author.object);

    const existingEmoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    existingEmoji.setup(m => m.name).returns(() => '🤡');

    const existingReaction = TypeMoq.Mock.ofType<MessageReaction>();
    existingReaction.setup(m => m.count).returns(() => 1);
    existingReaction.setup(m => m.emoji).returns(() => existingEmoji.object);
    existingReaction.setup(m => m.message).returns(() => message.object);

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 1);
    reaction.setup(m => m.emoji).returns(() => emoji.object);
    reaction.setup(m => m.message).returns(() => message.object);

    const reactionCache: Collection<string, MessageReaction> = new Collection<string, MessageReaction>(
      [
        ['a', reaction.object],
        ['b', existingReaction.object]
      ]
    );
    const reactions = TypeMoq.Mock.ofType<ReactionManager>();
    reactions.setup(m => m.cache).returns(() => reactionCache);

    message.setup(m => m.reactions).returns(() => reactions.object);

    const command = new JustAGirlCommand('bot id');
    const result = command.trigger(reaction.object);
    expect(result).to.be.false;
  });

  it('should not trigger on second (same) negative emoji', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '🤬');

    const author = TypeMoq.Mock.ofType<User>();
    author.setup(m => m.id).returns(() => 'bot id');

    const message = TypeMoq.Mock.ofType<Message>();
    message.setup(m => m.author).returns(() => author.object);

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 2);
    reaction.setup(m => m.emoji).returns(() => emoji.object);
    reaction.setup(m => m.message).returns(() => message.object);

    const reactionCache: Collection<string, MessageReaction> = new Collection<string, MessageReaction>(
      [
        ['a', reaction.object]
      ]
    );
    const reactions = TypeMoq.Mock.ofType<ReactionManager>();
    reactions.setup(m => m.cache).returns(() => reactionCache);

    message.setup(m => m.reactions).returns(() => reactions.object);

    const command = new JustAGirlCommand('bot id');
    const result = command.trigger(reaction.object);
    expect(result).to.be.false;
  });

  it('should not trigger on reaction to non-bot message', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '🤬');

    const author = TypeMoq.Mock.ofType<User>();
    author.setup(m => m.id).returns(() => 'some other id');

    const message = TypeMoq.Mock.ofType<Message>();
    message.setup(m => m.author).returns(() => author.object);

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 1);
    reaction.setup(m => m.emoji).returns(() => emoji.object);
    reaction.setup(m => m.message).returns(() => message.object);

    const command = new JustAGirlCommand('bot id');
    const result = command.trigger(reaction.object);
    expect(result).to.be.false;
  });
});
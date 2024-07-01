import { MessageReaction, ReactionEmoji } from 'discord.js';
import { expect } from 'chai';
import { GlitchCommand } from '../../../src/commands/funCommands/GlitchCommand.js';
import * as TypeMoq from 'typemoq';

describe('Glitch Command', function () {
  it('should trigger on first 😈', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '😈');

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 1);
    reaction.setup(m => m.emoji).returns(() => emoji.object);

    const command = new GlitchCommand();
    const result = command.trigger(reaction.object);
    expect(result).to.be.true;
  });

  it('should not trigger on subsequent 😈', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '😈');

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 2);
    reaction.setup(m => m.emoji).returns(() => emoji.object);

    const command = new GlitchCommand();
    const result = command.trigger(reaction.object);
    expect(result).to.be.false;
  });

  it('should not trigger on other emoji', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => '✨');

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.count).returns(() => 1);
    reaction.setup(m => m.emoji).returns(() => emoji.object);

    const command = new GlitchCommand();
    const result = command.trigger(reaction.object);
    expect(result).to.be.false;
  });
});
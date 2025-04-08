/* eslint-disable @typescript-eslint/no-unused-expressions */
import { MessageReaction, ReactionEmoji } from 'discord.js';
import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import { RedCardAlertCommand } from '../../../src/commands/utilityCommands/RedCardAlertCommand.js';

describe('Red Card Alert Command', function () {
  it('should trigger on red card', function () {
    const emoji = TypeMoq.Mock.ofType<ReactionEmoji>();
    emoji.setup(m => m.name).returns(() => 'redcard');

    const reaction = TypeMoq.Mock.ofType<MessageReaction>();
    reaction.setup(m => m.emoji).returns(() => emoji.object);

    const command = new RedCardAlertCommand(null);
    const result = command.reactionTrigger(reaction.object);
    expect(result).to.be.true;
  });
});
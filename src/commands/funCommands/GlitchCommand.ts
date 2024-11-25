import { MessageReaction } from 'discord.js';
import '../../extensions/StringExtension.js';
import { zalgoGeneration } from 'zalgo-generator';
import { ReactionCommand } from '../ReactionCommand.js';

export class GlitchCommand extends ReactionCommand {
  public override isSilly: boolean = true;
  public readonly name: string = 'glitch';
  public readonly description: string = 'Generates glitch text.';

  public override reactionTrigger(reaction: MessageReaction): boolean {
    if (reaction.emoji.name !== '😈') return false;
    return reaction.count === 1;
  }

  public override async execute(reaction: MessageReaction): Promise<void> {
    if (reaction == null) return;
    const content = reaction.message.content;
    const zalgoText = zalgoGeneration(content, 2, 2, 2);
    if (zalgoText.length >= 1999) return;
    await reaction.message.reply(zalgoText);
  }
}

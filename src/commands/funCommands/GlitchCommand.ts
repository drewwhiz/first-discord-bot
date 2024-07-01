import { MessageReaction } from 'discord.js';
import { IReactionCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { zalgoGeneration } from 'zalgo-generator';

export class GlitchCommand implements IReactionCommand {
  public readonly name: string = 'glitch';
  public readonly description: string = 'Generates glitch text.';

  public trigger(reaction: MessageReaction): boolean {
    if (reaction.emoji.name !== '😈') return false;
    return reaction.count === 1;
  }

  public async execute(reaction: MessageReaction): Promise<void> {
    if (reaction == null) return;
    const content = reaction.message.content;
    const zalgoText = zalgoGeneration(content, 2, 2, 2);
    if (zalgoText.length >= 1999) return;
    await reaction.message.reply(zalgoText);
  }
}

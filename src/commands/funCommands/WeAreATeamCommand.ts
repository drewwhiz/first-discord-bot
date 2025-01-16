import { Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';

export class WeAreATeamCommand extends MessageCommand {
  public override name: string = 'we\'re a team message';
  public override description: string = 'fist bump or respond';
  public override isSilly: boolean = true;

  private static isEmoji(cleanContent: string): boolean {
    return cleanContent === ':punch:' || cleanContent === ':right_facing_fist:' || cleanContent === ':left_facing_fist:';
  }

  private static isMessage(invariant: string): boolean {
    return invariant === 'were a team' || invariant === 'we are a team';
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (invariant == null || invariant == '') return false;
    return WeAreATeamCommand.isEmoji(message.cleanContent) || WeAreATeamCommand.isMessage(invariant);
  }

  public override async execute(message: Message): Promise<void> {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (WeAreATeamCommand.isEmoji(invariant)) {
      await message.reply('WE\'RE A TEAM');
      return;
    }

    if (WeAreATeamCommand.isMessage(invariant)) {
      await message.react('🤜');
      await message.react('🤛');
      await message.react('👊');
      return;
    }
  }
}

import { Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';

export class WeAreATeamCommand extends MessageCommand {
  public override name: string = 'we\'re a team message';
  public override description: string = 'fist bump or respond';
  public override isSilly: boolean = true;

  private static isEmoji(message: string): boolean {
    const invariant = message.toLowerCase().stripPunctuation().trim();
    return '👊🤜🤛'.includes(invariant);
  }

  private static isMessage(message: string): boolean {
    const invariant = message.toLowerCase().stripPunctuation().trim();
    return invariant === 'were a team' || invariant === 'we are a team';
  }

  public override messageTrigger(message: Message): boolean {
    return WeAreATeamCommand.isEmoji(message.content) || WeAreATeamCommand.isMessage(message.content);
  }

  public override async execute(message: Message): Promise<void> {
    if (WeAreATeamCommand.isEmoji(message.content)) {
      await message.reply('WE\'RE A TEAM');
      return;
    }

    if (WeAreATeamCommand.isMessage(message.content)) {
      await message.react('🤜');
      await message.react('🤛');
      await message.react('👊');
      return;
    }
  }
}

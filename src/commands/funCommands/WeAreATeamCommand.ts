import { GuildBasedChannel, Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';

export class WeAreATeamCommand extends MessageCommand {
  public override name: string = 'we\'re a team message';
  public override description: string = 'fist bump or respond';
  public override isSilly: boolean = true;

  public constructor(seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
  }

  private static isEmoji(content: string): boolean {
    return content.includes('🤜') || content.includes('🤛') || content.includes('👊');
  }

  private static isMessage(invariant: string): boolean {
    return invariant === 'were a team' || invariant === 'we are a team';
  }

  public override messageTrigger(message: Message): boolean {
    if (WeAreATeamCommand.isEmoji(message.content)) return true;
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return WeAreATeamCommand.isMessage(invariant);
  }

  public override async execute(message: Message): Promise<void> {
    if (WeAreATeamCommand.isEmoji(message.content)) {
      await message.reply('WE\'RE A TEAM');
      return;
    }

    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (WeAreATeamCommand.isMessage(invariant)) {
      await message.react('🤜');
      await message.react('🤛');
      await message.react('👊');
      return;
    }
  }
}

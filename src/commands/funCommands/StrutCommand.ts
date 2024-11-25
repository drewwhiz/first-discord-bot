import { ChannelType, Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class StrutCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'strut';
  public readonly description: string = 'Walk to Guntersville';

  private static readonly URL: string = 'https://www.youtube.com/watch?v=CdKvZDQt96o&t=52s';

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyPhrases(['guntersville', 'new hope']);
  }

  public override async execute(message: Message): Promise<void> {
    if (message.channel.type !== ChannelType.GuildText) return;
    const isAllowed = message.channel?.name === process.env.RESTRICTED_CHANNEL;
    if (!isAllowed) return;

    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (invariant.includes('guntersville')) {
      message = await message.reply('Guntersville?');
    } else if (invariant.includes('new hope')) {
      message = await message.reply('New Hope?');
    } else {
      return;
    }

    await message.reply(StrutCommand.URL);
  }
}

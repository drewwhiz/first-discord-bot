import { ChannelType, Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class TsimfdCommand extends MessageCommand {
  private static readonly TSIMFD: string = 'TSIMFD';

  public override readonly name: string = 'TSIMFD';
  public override readonly description: string = 'Chimes in with an appropriate reaction.';
  public override readonly isSilly: boolean = true;

  public override messageTrigger(message: Message): boolean {
    return this.containsCoolOrEquivalent(message.content);
  }

  public override async execute(message: Message): Promise<void> {
    const isInServerTextChannel = message.channel.type === ChannelType.GuildText;
    if (!isInServerTextChannel) return;
    const isAllowed = message.channel?.name === process.env.RESTRICTED_CHANNEL;
    if (!isAllowed) return;
    await message.reply(TsimfdCommand.TSIMFD);
  }

  private containsCoolOrEquivalent(text: string) {
    return text.containsAnyWords('cool', 'awesome', 'neat', 'dope') || TsimfdCommand.TSIMFD === text.toUpperCase();
  }
}
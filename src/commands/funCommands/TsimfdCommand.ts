import { IMessageCommand } from '../ICommand.js';
import { ChannelType, Message } from 'discord.js';
import '../../extensions/StringExtension.js';

export class TsimfdCommand implements IMessageCommand {
  private static readonly TSIMFD: string = 'TSIMFD';

  public readonly name: string = 'TSIMFD';
  public readonly description: string = 'Chimes in with an appropriate reaction.';

  public trigger(message: Message): boolean {
    return this.containsCoolOrEquivalent(message.content);
  }

  public async execute(message: Message): Promise<void> {
    const isInServerTextChannel = message.channel.type === ChannelType.GuildText;
    if (!isInServerTextChannel) {
      await message.reply(TsimfdCommand.TSIMFD);
      return;
    }

    const isAllowed = process.env.RESTRICTED_CHANNEL == null
      || process.env.RESTRICTED_CHANNEL.length === 0
      || message.channel?.name === process.env.RESTRICTED_CHANNEL;

    if (!isAllowed) return;
    await message.reply(TsimfdCommand.TSIMFD);
  }

  private containsCoolOrEquivalent(text: string) {
    return text.containsAnyWords('cool', 'awesome', 'neat', 'dope') || TsimfdCommand.TSIMFD === text.toUpperCase();
  }
}
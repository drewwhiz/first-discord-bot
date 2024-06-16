import { ICommand } from '../ICommand.js';
import { ChannelType, Message } from 'discord.js';
import '../../extensions/StringExtension.js';

export class TsimfdCommand implements ICommand {
  private static readonly TSIMFD: string = 'TSIMFD';
  private static readonly ALLOWED_CHANNEL: string = 'mentor-talk';

  public readonly name: string = 'TSIMFD';
  public readonly description: string = 'Chimes in with an appropriate reaction.';

  public trigger(message: Message): boolean {
    return this.containsCoolOrEquivalent(message.content);
  }

  public async execute(message: Message): Promise<void> {
    const isInChannel = message.channel.type === ChannelType.GuildText;
    if (!isInChannel) {
      await message.reply(TsimfdCommand.TSIMFD);
      return;
    }

    const isInAllowedChannel = isInChannel && message.channel?.name === TsimfdCommand.ALLOWED_CHANNEL;
    if (isInAllowedChannel) {
      await message.reply(TsimfdCommand.TSIMFD);
      return;
    }
  }

  private containsCoolOrEquivalent(text: string) {
    return text.containsAnyWords('cool', 'awesome', 'neat', 'dope') || TsimfdCommand.TSIMFD === text.toUpperCase();
  }
}
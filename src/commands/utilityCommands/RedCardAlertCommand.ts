import { IReactionCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { GuildTextBasedChannel, ChannelType, MessageReaction, EmbedBuilder, User } from 'discord.js';

export class RedCardAlertCommand implements IReactionCommand {
  public name: string = 'red card alert';
  public description: string = 'Reports when a red card reaction is issued';
  private readonly _emojiName: string = 'redcard';

  public trigger(reaction: MessageReaction): boolean {
    return reaction.emoji.name === this._emojiName;
  }

  public async execute(reaction: MessageReaction, user: User): Promise<void> {
    if (process.env.MOD_REPORT_CHANNEL == null || process.env.MOD_REPORT_CHANNEL.length === 0) return;
    const modChannel = reaction.client.channels.cache.find(c => c.type === ChannelType.GuildText && (c as GuildTextBasedChannel).name === process.env.MOD_REPORT_CHANNEL) as GuildTextBasedChannel;
    if (modChannel == null) return;

    const reactionChannel = reaction.message.channel as GuildTextBasedChannel;
    if (reactionChannel == null) return;

    const content = reaction.message.content;
    const embed = new EmbedBuilder()
      .setTitle('Red Card Issued')
      .setDescription(`${(user.globalName ?? user.username) ?? user.username} issued a red card on this post.`)
      .addFields(
        { name: 'Author', value: (reaction.message.author.globalName ?? reaction.message.author.username) ?? reaction.message.author.username, inline: true },
        { name: 'Message Link', value: `${reaction.message.url}`, inline: true }
      )
      .addFields(
        { name: 'Preview', value: `${content == null || content.length === 0 ? 'Preview Unavailable' : content}`}
      );

    await modChannel.send({ embeds: [embed] });
  }
}

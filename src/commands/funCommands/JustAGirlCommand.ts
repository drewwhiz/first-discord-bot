import { GuildBasedChannel, MessageReaction } from 'discord.js';
import { ReactionCommand } from '../ReactionCommand.js';

export class JustAGirlCommand extends ReactionCommand {
  public readonly isSilly: boolean = true;
  private static readonly NEGATIVE_REACTS = '😒🙄😕😟🙁☹😧😦😨😥😢😖😣😞😓😩😫😤😡😠🤬👿💩🤡😾🖕👎🔪🛑🔇🔕📉🗑⚰⚱🚮⚠⛔🚫⏸⏹⏏🔅📴✖❌❎➖🆘🔴🚩⏸️⏹️';
  public name: string = 'just a girl';
  public description: string = 'sends a video when one of my messages are reacted negatively';
  private readonly _userId: string;

  public constructor(userId: string, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._userId = userId;
  }

  public override reactionTrigger(reaction: MessageReaction): boolean {
    if (reaction.message.author.id !== this._userId) return false;
    if (!JustAGirlCommand.NEGATIVE_REACTS.includes(reaction.emoji.name)) return false;

    const negativeReactions = reaction.message.reactions.cache
      .filter(r => JustAGirlCommand.NEGATIVE_REACTS.includes(r.emoji.name))
      .map(r => r.count)
      .reduce((acc, val) => acc + val, 0);

    return negativeReactions === 1;
  }

  public override async execute(reaction: MessageReaction): Promise<void> {
    const user = (await reaction.users.fetch()).first();
    const content = user == null ? '' : `<@!${user.id}>`;
    await reaction.message.reply({
      content: content,
      files: ['./img/just-a-girl.jpeg']
    });
  }
}
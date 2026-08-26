import { MessageReaction } from 'discord.js';
import { ReactionCommand } from '../ReactionCommand.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class JustAGirlCommand extends ReactionCommand {
  public readonly isSilly: boolean = false;
  private static readonly NEGATIVE_REACTS = '😒🙄😕😟🙁☹😧😦😨😥😢😖😣😞😓😩😫😤😡😠🤬👿💩🤡😾🖕👎🔪🛑🔇🔕📉🗑⚰⚱🚮⚠⛔🚫⏸⏹⏏🔅📴✖❌❎➖🆘🔴🚩⏸️⏹️';
  public name: string = 'just a girl';
  public description: string = 'sends a video when one of my messages are reacted negatively';
  private readonly _userId: string;

  public constructor(userId: string, channelService: IChannelService) {
    super(channelService);
    this._userId = userId;
  }

  public override reactionTrigger(reaction: MessageReaction): boolean {
    if (reaction?.message?.author?.id !== this._userId) return false;
    if (reaction?.emoji?.name == null) return false;
    if (!JustAGirlCommand.NEGATIVE_REACTS.includes(reaction?.emoji?.name)) return false;

    const negativeReactions = reaction.message.reactions.cache
      .filter(r => r?.emoji?.name == null ? false : JustAGirlCommand.NEGATIVE_REACTS.includes(r?.emoji?.name))
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
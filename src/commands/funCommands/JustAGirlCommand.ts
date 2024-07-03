import { MessageReaction } from 'discord.js';
import { IReactionCommand } from '../ICommand.js';

export class JustAGirlCommand implements IReactionCommand {
  private static readonly NEGATIVE_REACTS = '😒🙄😕😟🙁☹😧😦😨😥😢😖😣😞😓😩😫😤😡😠🤬👿💩🤡😾🖕👎🔪🛑🔇🔕📉🗑⚰⚱🚮⚠⛔🚫⏸⏹⏏🔅📴✖❌❎➖🆘🔴🚩⏸️⏹️';
  public name: string = 'just a girl';
  public description: string = 'sends a video when one of my messages are reacted negatively';
  private readonly _userId: string;

  public constructor(userId: string) {
    this._userId = userId;
  }

  public trigger(reaction: MessageReaction): boolean {
    if (reaction.message.author.id !== this._userId) return false;
    if (!JustAGirlCommand.NEGATIVE_REACTS.includes(reaction.emoji.name)) return false;

    const negativeReactions = reaction.message.reactions.cache
      .filter(r => JustAGirlCommand.NEGATIVE_REACTS.includes(r.emoji.name))
      .map(r => r.count)
      .reduce((acc, val) => acc + val, 0);

    return negativeReactions === 1;
  }

  public async execute(reaction: MessageReaction): Promise<void> {
    const user = (await reaction.users.fetch()).first();
    const content = user == null ? '' : `<@!${user.id}>`;
    await reaction.message.reply({
      content: content,
      files: ['./img/just-a-girl.jpeg']
    });
  }
}
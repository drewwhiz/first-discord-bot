import { ICommand } from '../ICommand.js';
import { Message, MessageType } from 'discord.js';

export class YikesCommand implements ICommand {
  public readonly name: string = 'yikes';
  public readonly description: string = 'Uses a yikes reaction on the message being replied to. If not replying, just messages the emoji.';
  private readonly _emojiName: string = 'annayikes';

  public trigger(message: Message): boolean {
    return message.content.stripPunctuation().trim().toLowerCase() === 'yikes';
  }

  public async execute(message: Message): Promise<void> {
    const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === this._emojiName);
    if (reactionEmoji == null) return;

    const isReply = message.type == MessageType.Reply;
    if (isReply) {
      const messageId = message.reference.messageId;
      const messageToReact =  await message.channel.messages.fetch(messageId);
      messageToReact.react(reactionEmoji);
      return;
    } else {
      message.channel.send(`<:${this._emojiName}:${reactionEmoji.id}>`);
    }
  }
}
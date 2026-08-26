import { Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';

export class WompCommand extends MessageCommand {
  public readonly isSilly: boolean = false;
  public readonly name: string = 'womp';
  public readonly description: string = 'Womp womp';
  private readonly _emojiName: string = 'womp';


  public override messageTrigger(message: Message): boolean {
    const content = message.content.toLowerCase().stripPunctuation().trim();
    return content.includes('womp') || content.includes('whomp');
  }

  public override async execute(message: Message): Promise<void> {
    const reactionEmoji = message?.guild?.emojis?.cache?.find(emoji => emoji.name === this._emojiName);
    if (reactionEmoji == null) return;
    await message.react(reactionEmoji);
  }
}
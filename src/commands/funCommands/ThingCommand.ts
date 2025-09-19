import { GuildBasedChannel, Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';

export class ThingCommand extends MessageCommand {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'the thing';
  public override readonly description: string = 'Here\'s the thing';
  private readonly _emojiName: string = 'thething';

  public constructor(seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
  }

  public override messageTrigger(message: Message): boolean {
    const content = message.content.stripPunctuation().trim().toLowerCase();
    return content.includes('the thing');
  }

  public override async execute(message: Message): Promise<void> {
    const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === this._emojiName);
    if (reactionEmoji == null) return;
    await message.react(reactionEmoji);
  }
}
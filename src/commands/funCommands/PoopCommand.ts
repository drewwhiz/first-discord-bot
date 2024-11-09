import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class PoopCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'poop';
  public readonly description: string = 'Cleans the poop.';

  private static readonly POOP_EMOJI: string = '💩';
  private static readonly TOILET_PAPER_EMOJI: string = '🧻';
  private static readonly TOILET_EMOJI: string = '🚽';

  public override messageTrigger(message: Message): boolean {
    return message.content.includes(PoopCommand.POOP_EMOJI);
  }

  public override async execute(message: Message): Promise<void> {
    const myReply = await message.reply(PoopCommand.TOILET_PAPER_EMOJI);
    await myReply.reply(`And don't forget to ${PoopCommand.TOILET_EMOJI}`);
  }
}

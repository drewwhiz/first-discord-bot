import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class OopsCommand extends MessageCommand {
  public readonly name: string = 'oops';
  public readonly description: string = 'Responds to oops';
  public override readonly isSilly: boolean = true;

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('oops');
  }

  public override async execute(message: Message): Promise<void> {
    message.reply('> oops\nClassic');
  }
}

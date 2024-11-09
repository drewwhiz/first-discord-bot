import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class HearMeOutCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'Hear Me Out';
  public readonly description: string = 'Chimes in with an appropriate response to \'Hear me out...\'.';

  public override messageTrigger(message: Message): boolean {
    const content = message.content.stripPunctuation().trim().toLowerCase();
    return content.startsWith('hear me out') || (content.length <= 30 && content.includes('hear me out'));
  }

  public override async execute(message: Message): Promise<void> {
    message.reply('Listening...');
  }
}
import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class StopCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'stop';
  public readonly description: string = 'Responds to stop in the Discord.';

  public override messageTrigger(message: Message): boolean {
    return message.content.stripPunctuation().toLowerCase().trim() == 'stop';
  }

  public override async execute(message: Message): Promise<void> {
    const newMessage = await message.reply('Collaborate.');
    await newMessage.reply('And listen!');
  }
}

import { Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class StopCommand implements IMessageCommand {
  public readonly name: string = 'stop';
  public readonly description: string = 'Responds to stop in the Discord.';

  public trigger(message: Message): boolean {
    return message.content.stripPunctuation().toLowerCase().trim() == 'stop';
  }

  public async execute(message: Message): Promise<void> {
    const newMessage = await message.reply('Collaborate.');
    await newMessage.reply('And listen!');
  }
}

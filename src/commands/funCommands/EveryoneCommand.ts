import { Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class EveryoneCommand implements IMessageCommand {
  public readonly name: string = 'everyone';
  public readonly description: string = 'Responds to messages where everyone is tagged.';

  public trigger(message: Message): boolean {
    return message.mentions.everyone;
  }

  public async execute(message: Message): Promise<void> {
    await message.reply('Is this for us?');
  }
}

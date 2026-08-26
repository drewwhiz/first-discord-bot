import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class EveryoneCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'everyone';
  public readonly description: string = 'Responds to messages where everyone is tagged.';

  public override messageTrigger(message: Message): boolean {
    return message.mentions.everyone;
  }

  public override async execute(message: Message): Promise<void> {
    await message.reply('Is this for us?');
  }
}

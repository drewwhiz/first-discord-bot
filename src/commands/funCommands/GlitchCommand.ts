import { Message, MessageType } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { zalgoGeneration } from 'zalgo-generator';

export class GlitchCommand implements ICommand {
  public readonly name: string = 'glitch';
  public readonly description: string = 'Generates glitch text.';

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant == 'glitch' && message.type == MessageType.Reply;
  }

  public async execute(message: Message): Promise<void> {
    const messageId = message.reference.messageId;
    const content = (await message.channel.messages.fetch(messageId)).content;
    const zalgoText = zalgoGeneration(content, 3, 3, 3);
    if (zalgoText.length >= 1999) {
      await message.reply('Message will be too long - try a shorter (and non-glitched) message');
      return;
    };
    await message.reply(zalgoText);
  }
}

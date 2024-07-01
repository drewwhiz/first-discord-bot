import { Client, Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class GoodBotBadBotCommand implements IMessageCommand {
  public readonly name: string = 'good bot, bad bot';
  public readonly description: string = 'Reacts to good bot replies and bad bot messages';
  private static readonly GOODBOT_EMOJI = '🫡';
  private static readonly BADBOT_EMOJI = '😢';

  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant == 'good bot' 
            || invariant == 'goodbot'
            || invariant == 'bad bot'
            || invariant == 'badbot';
  }

  public async execute(message: Message): Promise<void> {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (invariant == 'bad bot' || invariant == 'badbot') {
      await message.react(GoodBotBadBotCommand.BADBOT_EMOJI);
      return;
    }

    if (invariant == 'good bot' || invariant == 'goodbot') {
      await message.react(GoodBotBadBotCommand.GOODBOT_EMOJI);
      return;
    }
  }
}

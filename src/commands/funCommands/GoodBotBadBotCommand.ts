import { Client, GuildBasedChannel, Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class GoodBotBadBotCommand extends MessageCommand {
  public readonly name: string = 'good bot, bad bot';
  public readonly description: string = 'Reacts to good bot replies and bad bot messages';
  public readonly isSilly: boolean = true;

  private static readonly GOODBOT_EMOJI = '🫡';
  private static readonly BADBOT_EMOJI = '😢';

  private client: Client;

  public constructor(client: Client, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this.client = client;
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant == 'good bot'
      || invariant == 'goodbot'
      || invariant == 'bad bot'
      || invariant == 'badbot';
  }

  public override async execute(message: Message): Promise<void> {
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

import { GuildBasedChannel, Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class GameCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'game';
  public override readonly description: string = 'Loses the game.';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService, seriousChannels: GuildBasedChannel[]) {
    super(cooldowns, seriousChannels);
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.stripPunctuation().toLowerCase().trim();
    return invariant.containsAnyWords('game', 'games');
  }

  public override async action(message: Message): Promise<void> {
    await message.reply('I just lost the game.');
  }
}

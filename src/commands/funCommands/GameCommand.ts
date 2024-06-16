import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { DateTimeUtilities } from '../../utility/DateTimeUtilities.js';

export class GameCommand implements ICommand {
  private static COOLDOWN_HOURS: number = 24; // One day

  public readonly name: string = 'game';
  public readonly description: string = 'Loses the game.';

  private readonly _coolDowns: ICooldownDataService;

  constructor(coolDowns: ICooldownDataService) {
    this._coolDowns = coolDowns;
  }

  public trigger(message: Message): boolean {
    const invariant = message.content.stripPunctuation().toLowerCase().trim();
    return invariant.containsAnyWords('game', 'games');
  }

  public async execute(message: Message): Promise<void> {
    let activeCooldown = await this._coolDowns.getByKeys(this.name, message.channelId);
    if (activeCooldown == null) {
      activeCooldown = {
        id: 0,
        commandName: this.name,
        channelId: message.channelId,
        deadline: null
      };
    }

    if (DateTimeUtilities.isCooldownInEffect(activeCooldown.deadline)) return;
    activeCooldown.deadline = DateTimeUtilities.getFutureTimeUTCString(GameCommand.COOLDOWN_HOURS);
    await this._coolDowns.upsert(activeCooldown);
    await message.reply('I just lost the game.');
  }
}

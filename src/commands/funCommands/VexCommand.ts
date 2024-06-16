import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { DateTimeUtilities } from '../../utility/DateTimeUtilities.js';

export class VexCommand implements ICommand {
  private static COOLDOWN_HOURS: number = 1;

  public readonly name: string = 'vex';
  public readonly description: string = 'Responds appropriately to vex';

  private readonly _coolDowns: ICooldownDataService;

  constructor(coolDowns: ICooldownDataService) {
    this._coolDowns = coolDowns;
  }

  public trigger(message: Message): boolean {
    return message.content.toLowerCase().stripPunctuation().trim().containsAnyWords('vex');
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
    activeCooldown.deadline = DateTimeUtilities.getFutureTimeUTCString(VexCommand.COOLDOWN_HOURS);
    await this._coolDowns.upsert(activeCooldown);
    await message.reply('Vex? Ew.');
  }
}

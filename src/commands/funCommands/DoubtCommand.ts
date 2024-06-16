import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { DateTimeUtilities } from '../../utility/DateTimeUtilities.js';

export class DoubtCommand implements ICommand {
  private static COOLDOWN_HOURS: number = 24; // One day

  public readonly name: string = 'doubt';
  public readonly description: string = 'X to Doubt';

  private readonly _coolDowns: ICooldownDataService;

  constructor(coolDowns: ICooldownDataService) {
    this._coolDowns = coolDowns;
  }

  trigger(message: Message): boolean {
    return message.content.stripPunctuation().trim().toLowerCase() == 'x';
  }

  async execute(message: Message): Promise<void> {
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
    activeCooldown.deadline = DateTimeUtilities.getFutureTimeUTCString(DoubtCommand.COOLDOWN_HOURS);

    await this._coolDowns.upsert(activeCooldown);
    await message.channel.send({
      files: ['./img/doubt.jpg']
    });
  }
}
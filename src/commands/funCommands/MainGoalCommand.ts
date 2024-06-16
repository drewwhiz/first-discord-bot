import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { DateTimeUtilities } from '../../utility/DateTimeUtilities.js';

export class MainGoalCommand implements ICommand {
  private static COOLDOWN_HOURS: number = 24; // one day

  public readonly name: string = 'mainGoal';
  public readonly description: string =
    'Responds to messages containing \'goal\' in the Discord.';

  private readonly _coolDowns: ICooldownDataService;

  constructor(coolDowns: ICooldownDataService) {
    this._coolDowns = coolDowns;
  }

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('goal', 'goals');
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
    activeCooldown.deadline = DateTimeUtilities.getFutureTimeUTCString(MainGoalCommand.COOLDOWN_HOURS);
    await this._coolDowns.upsert(activeCooldown);

    await message.reply(
      'My main goal is to blow up, then act like I don\'t know nobody. Hahahahahaha.',
    );
  }
}

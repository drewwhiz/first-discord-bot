import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class MainGoalCommand extends CooldownCommandBase {
  public override readonly name: string = 'mainGoal';
  public override readonly description: string =
    'Responds to messages containing \'goal\' in the Discord.';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService) {
    super(cooldowns);
  }

  public override trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('goal', 'goals');
  }

  public override async action(message: Message): Promise<void> {
    await message.reply(
      'My main goal is to blow up, then act like I don\'t know nobody. Hahahahahaha.',
    );
  }
}

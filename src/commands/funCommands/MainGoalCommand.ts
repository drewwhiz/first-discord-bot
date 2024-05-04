import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class MainGoalCommand implements ICommand {
  public name: string = 'mainGoal';
  public description: string =
    'Responds to messages containing \'goal\' in the Discord.';

  public trigger(message: Message): boolean {
    return message != null && message.content.containsAnyWords('goal', 'goals');
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.reply(
      'My main goal is to blow up, then act like I don\'t know nobody. Hahahahahaha.',
    );
  }
}

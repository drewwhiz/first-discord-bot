import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class MainGoalCommand implements ICommand {
  private static COOLDOWN: number = 24 * 60 * 60 * 1000;

  private lastTime: Date;

  public name: string = 'mainGoal';
  public description: string =
    'Responds to messages containing \'goal\' in the Discord.';

  public trigger(message: Message): boolean {
    return message != null && message.content.containsAnyWords('goal', 'goals');
  }

  public async execute(message: Message): Promise<void> {
    const now = new Date();
    if (this.lastTime != null) {
      if (now.getTime() - this.lastTime.getTime() < MainGoalCommand.COOLDOWN) return;
    }

    this.lastTime = now;
    message.reply(
      'My main goal is to blow up, then act like I don\'t know nobody. Hahahahahaha.',
    );
  }
}

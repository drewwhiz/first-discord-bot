import { Message } from 'discord.js';
import { Dictionary } from 'typescript-collections';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class GameCommand implements ICommand {
  private static COOLDOWN: number = 15 * 60 * 1000;

  public name: string = 'game';
  public description: string = 'Loses the game.';
  private lastLosses: Dictionary<string, Date> = new Dictionary<string, Date>();

  public trigger(message: Message): boolean {
    if (message == null) return false;
    const hasGame = message.content.stripPunctuation().toLowerCase().containsAnyWords('game', 'games');
    if (!hasGame) return false;

    const destination = message.channel?.id;
    if (destination == null) return false;

    const now = new Date();
    const lastLoss = this.lastLosses.getValue(destination);
    if (lastLoss == null) {
      this.lastLosses.setValue(destination, now);
      return true;
    }

    if (Math.abs(now.getTime() - lastLoss.getTime()) > GameCommand.COOLDOWN) {
      this.lastLosses.setValue(destination, now);
      return true;
    }

    return false;
  }

  public async execute(message: Message): Promise<void> {
    message.reply('I just lost the game.');
  }
}

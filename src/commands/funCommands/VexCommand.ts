import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class VexCommand implements ICommand {
  private static COOLDOWN: number = 4 * 60 * 60 * 1000;

  public name: string = 'vex';
  public description: string = 'Responds appropriately to vex';

  private _lastTrigger: Date;


  public trigger(message: Message): boolean {
    const isTriggered = message.content.toLowerCase().stripPunctuation().trim().containsAnyWords('vex');
    if (!isTriggered) return false;

    const now = new Date();
    if (this._lastTrigger == null) {
      this._lastTrigger = now;
      return true;
    }

    if (Math.abs(now.getTime() - this._lastTrigger.getTime()) > VexCommand.COOLDOWN) {
      this._lastTrigger = now;
      return true;
    }

    return false;
  }

  public async execute(message: Message): Promise<void> {
    await message.reply('Vex? Ew.');
  }
}

import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';

export class WompCommand implements ICommand {
  public readonly name: string = 'womp';
  public readonly description: string = 'Womp womp';

  public trigger(message: Message): boolean {
    const content = message.content.toLowerCase().stripPunctuation().trim();
    const hasWomp = content.includes('womp');
    if (!hasWomp) return false;

    const hasNothingElse = content.replaceAll('womp', '').trim().length == 0;
    return hasNothingElse;
  }

  public async execute(message: Message): Promise<void> {
    await message.reply({
      files: ['./img/womp-womp.gif']
    });
  }
}
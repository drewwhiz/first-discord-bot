import { Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';

export class WompCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'womp';
  public readonly description: string = 'Womp womp';

  public override messageTrigger(message: Message): boolean {
    const content = message.content.toLowerCase().stripPunctuation().trim();
    const hasWomp = content.includes('womp');
    if (!hasWomp) return false;

    const hasNothingElse = content.replaceAll('womp', '').trim().length == 0;
    return hasNothingElse;
  }

  public override async execute(message: Message): Promise<void> {
    await message.reply({
      files: ['./img/womp-womp.gif']
    });
  }
}
import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class SecretTunnelCommand extends MessageCommand {
  public readonly name: string = 'secret-tunnel';
  public readonly description: string = 'Responds to \'secret tunnel\' in the Discord.';
  public override readonly isSilly: boolean = true;

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyPhrases(['secret tunnel']);
  }

  public override async execute(message: Message): Promise<void> {
    const reply = await message.reply('Yeah, and then I forget the next couple lines, but uh, here it goes...');
    await reply.reply({
      files: [
        './audio/001.mp3'
      ]
    });
  }
}

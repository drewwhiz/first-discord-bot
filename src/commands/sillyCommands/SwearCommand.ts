import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class SwearCommand extends MessageCommand {
  public readonly name: string = 'i swear';
  public readonly description: string = 'Responds to i swear';
  public override readonly isSilly: boolean = true;

  private readonly _regex: RegExp = new RegExp(/\b(i swear)\b/, 'gi');


  public override messageTrigger(message: Message): boolean {
    return this._regex.test(message.content);
  }

  public override async execute(message: Message): Promise<void> {
    const matches = message.content.match(this._regex);
    if (matches == null || matches.length == 0) return;

    const match = matches[0];

    await message.reply(`> ${match}\nUnder oath?`);
  }
}

import { Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';
import { factorial } from 'mathjs';

export class UnexpectedFactorialCommand extends MessageCommand {
  public override readonly name: string = 'factorial';
  public override readonly description: string = 'Computes a factorial.';
  public override readonly isSilly: boolean = false;

  private readonly _regex: RegExp = new RegExp(/([1-9][0-9]*|0)!/, 'g');


  public constructor(channelService: IChannelService) {
    super(channelService);
  }

  public override messageTrigger(message: Message): boolean {
    return this._regex.test(message.content);
  }

  public override async execute(message: Message): Promise<void> {
    const matches = message.content.match(this._regex);
    if (matches == null) return;

    for (let index = 0; index < matches.length; index++) {
      const element = matches[index].slice(0, -1);
      const number = parseInt(element);
      const value = factorial(number);
      await message.reply(`> ${matches[index]}\nUnexpected Factorial: ${value}`);
    }
  }
}
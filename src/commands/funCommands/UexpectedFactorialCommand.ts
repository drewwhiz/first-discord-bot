import { Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class UnexpectedFactorialCommand extends MessageCommand {
  public override readonly name: string = 'factorial';
  public override readonly description: string = 'Computes a factorial.';
  public override readonly isSilly: boolean = false;

  private readonly _factorialRegex: RegExp = new RegExp(/([1-9][0-9]*|0)!/, 'g');
  private readonly _exponentRegex: RegExp = new RegExp(/e+.*/, 'g');

  private readonly _calculationFormat: BigIntToLocaleStringOptions = {
    notation: 'scientific',
    maximumFractionDigits: 10 // The default is 3, but 20 is the maximum supported by JS according to MDN.
  };

  public constructor(channelService: IChannelService) {
    super(channelService);
  }

  public override messageTrigger(message: Message): boolean {
    return this._factorialRegex.test(message.content);
  }

  public override async execute(message: Message): Promise<void> {
    const matches = message.content.match(this._factorialRegex);
    if (matches == null) return;

    for (let index = 0; index < matches.length; index++) {
      const element = matches[index].slice(0, -1);
      const number = parseInt(element);
      const value = this.factorial(number);
      
      let text = value.toLocaleString('en-US', this._calculationFormat).replace('E', 'e+');
      const expMatch = text.match(this._exponentRegex);
      if (expMatch != null && expMatch.length == 1) {
        const power = parseInt(expMatch[0].replace('e+', ''));
        if (power < 11) text = `${value}`;
      }
      await message.reply(`> ${matches[index]}\nUnexpected Factorial: ${text}`);
    }
  }

  private factorial(n: number): bigint {
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
      result *= i;
    }

    return result;
  }

}
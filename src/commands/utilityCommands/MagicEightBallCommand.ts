import { GuildBasedChannel, Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { IRandomNumberService } from '../../services/interfaces/IRandomNumberService.js';
import { MessageCommand } from '../MessageCommand.js';

export class MagicEightBallCommand extends MessageCommand {
  public override isSilly: boolean = true;
  private static readonly ANSWERS: string[] = [
    'It is certain',
    'Reply hazy, try again',
    'Don\'t count on it',
    'It is decidedly so',
    'Ask again later',
    'My reply is no',
    'Without a doubt',
    'Better not tell you now',
    'My sources say no',
    'Yes definitely',
    'Cannot predict now',
    'Outlook not so good',
    'You may rely on it',
    'Concentrate and ask again',
    'Very doubtful',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes'
  ];

  public readonly name: string = 'magic 8 ball';
  public readonly description: string = 'Gives magic 8 ball responses';

  private readonly _random: IRandomNumberService;

  public constructor(random: IRandomNumberService, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._random = random;
  }

  public override messageTrigger(message: Message): boolean {
    const content = message.content.stripPunctuation().toLowerCase().replace(/\s/g, '').trim();
    const hasStart = content.startsWith('magic8ball') || content.startsWith('magiceightball');
    if (!hasStart) return false;
    const otherContent = content.replaceAll('magic', '').replaceAll('ball', '').replaceAll('eight', '').replaceAll('8', '');
    return otherContent.length > 0;
  }

  public override async execute(message: Message): Promise<void> {
    await message.reply(this.getAnswer());
  }

  private getAnswer(): string {
    const roll = this._random.getSingleRoll(MagicEightBallCommand.ANSWERS.length);
    return MagicEightBallCommand.ANSWERS[roll - 1];
  }
}

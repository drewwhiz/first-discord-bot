import { GuildBasedChannel, Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class SixSevenCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'six-seven';
  public override readonly description: string = 'respond to someone doing six-seven';
  public override readonly cooldownHours: number = 24;

  private readonly _regex: RegExp = new RegExp(/(six|6)\s*(seven|7)/, 'gmi');

  public constructor(cooldowns: ICooldownDataService, seriousChannels: GuildBasedChannel[]) {
    super(cooldowns, seriousChannels);
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.stripPunctuation().trim().toLowerCase();
    return this._regex.test(invariant);
  }

  public override async action(message: Message): Promise<void> {
    let response = await message.reply('Did someone say...');
    response = await response.reply('SIX');
    response = await response.reply('SEVEN');
    await response.reply('🫳🫴🫳🫴');
  }
}
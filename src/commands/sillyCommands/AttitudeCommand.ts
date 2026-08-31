import { Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class AttitudeCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'not with that attitude';
  public override readonly description: string = 'handles when someone cannot do something';
  private readonly _regex: RegExp = new RegExp(/\w+\s+(can't|cant|cannot)/, 'gi');

  public constructor(cooldowns: ICooldownDataService, channelService: IChannelService) {
    super(channelService, cooldowns, 12);
  }

  public override messageTrigger(message: Message): boolean {
    return this._regex.test(message.content);
  }

  public override async action(message: Message): Promise<void> {
    const matches = message.content.match(this._regex);
    if (matches == null || matches.length == 0) return;
    await message.reply(`> ${matches[0]}\nNot with that attitude.`);
  }
}
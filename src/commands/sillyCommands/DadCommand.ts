import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';

export class DadCommand extends CooldownCommandBase {
  public readonly name: string = 'hi i\'m dad';
  public readonly description: string = 'Does the usual dad joke';
  public override readonly isSilly: boolean = true;
  private readonly _regex: RegExp = new RegExp(/(i'm|i am|im) /, 'i');


  public constructor(cooldownService: ICooldownDataService, channelService: IChannelService,) {
    super(channelService, cooldownService, 24);
  }

  public override messageTrigger(message: Message): boolean {
    return this._regex.test(message.content);
  }

  public override async action(message: Message): Promise<void> {
    const text = message.content.split('.')[0];
    const name = text.replace(/(i'm|i am|im) /i, '');
    await message.reply(`Hi ${name}, I'm Dad`);
  }
}

import { Message, TextChannel } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class DoubtCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'doubt';
  public override readonly description: string = 'X to Doubt';

  public constructor(cooldowns: ICooldownDataService, channelService: IChannelService) {
    super(channelService, cooldowns, 24);
  }

  public override messageTrigger(message: Message): boolean {
    return message.content.stripPunctuation().trim().toLowerCase() == 'x';
  }

  public override async action(message: Message): Promise<void> {
    const channel = message.channel as TextChannel;
    if (channel == null) return;

    await channel.send({
      files: ['./img/doubt.jpg']
    });
  }
}
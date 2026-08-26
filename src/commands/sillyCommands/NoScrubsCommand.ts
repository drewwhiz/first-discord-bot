import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class NoScrubsCommand extends CooldownCommandBase {
  public readonly name: string = 'no scrubs';
  public readonly description: string = 'Also known as a busta.';
  public override readonly isSilly: boolean = true;

  public constructor(cooldowns: ICooldownDataService, channelService: IChannelService) {
    super(channelService, cooldowns, 24);
  }

  public override messageTrigger(message: Message): boolean {
    return message.content.toLocaleLowerCase().stripPunctuation().containsAnyWords('scrub', 'scrubs');
  }

  public override async execute(message: Message): Promise<void> {
    let reply = await message.reply('No, I don\'t want no scrub');
    reply = await reply.reply('A scrub is a guy that can\'t get no love from me');
    reply = await reply.reply('Hangin\' out the passenger side of his best friend\'s ride');
    await reply.reply('Trying to holla at me');
  }
}

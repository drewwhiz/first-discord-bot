import { GuildBasedChannel, Message } from 'discord.js';
import { IMessageCommand } from './ICommand.js';
import { IChannelService } from '../services/interfaces/IChannelService.js';

export abstract class MessageCommand implements IMessageCommand {
  public abstract readonly name: string;
  public abstract readonly description: string;
  public abstract readonly isSilly: boolean;

  private readonly _channelService: IChannelService;

  public constructor(channelService: IChannelService) {
    this._channelService = channelService;
  }

  protected abstract messageTrigger(message: Message): boolean;

  public trigger(message: Message): boolean {
    const channel = message.channel as GuildBasedChannel;
    const canBeSilly = channel == null || this._channelService == null || this._channelService.isSillyAllowed(channel);
    if (this.isSilly && !canBeSilly) return false;
    return this.messageTrigger(message);
  }

  public abstract execute(message: Message): Promise<void>;
}
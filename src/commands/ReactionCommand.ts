import { GuildBasedChannel, MessageReaction, User } from 'discord.js';
import { IReactionCommand } from './ICommand.js';
import { IChannelService } from '../services/interfaces/IChannelService.js';

export abstract class ReactionCommand implements IReactionCommand {
  public abstract readonly name: string;
  public abstract readonly description: string;
  public abstract readonly isSilly: boolean;

  protected readonly _channelService: IChannelService;

  public constructor(channelService: IChannelService) {
    this._channelService = channelService;
  }

  protected abstract reactionTrigger(reaction: MessageReaction): boolean;

  public trigger(reaction: MessageReaction): boolean {
    const channel = reaction.message.channel as GuildBasedChannel;
    const canBeSilly = channel == null || this._channelService == null || this._channelService.isSillyAllowed(channel);
    if (this.isSilly && !canBeSilly) return false;
    return this.reactionTrigger(reaction);
  }

  public abstract execute(reaction: MessageReaction, user: User): Promise<void>;
}
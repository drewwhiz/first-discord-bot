import { GuildBasedChannel, Message } from 'discord.js';
import { IMessageCommand } from './ICommand.js';

export abstract class MessageCommand implements IMessageCommand {
  public abstract readonly name: string;
  public abstract readonly description: string;
  public abstract readonly isSilly: boolean;

  protected readonly _seriousChannels: GuildBasedChannel[];

  public constructor(seriousChannels: GuildBasedChannel[]) {
    this._seriousChannels = seriousChannels ?? [];
  }

  protected abstract messageTrigger(message: Message): boolean;

  public trigger(message: Message): boolean {
    const channel = message.channel as GuildBasedChannel;
    const canBeSilly = channel == null || !this._seriousChannels.includes(channel);
    if (this.isSilly != canBeSilly) return false;
    return this.messageTrigger(message);
  }

  public abstract execute(message: Message): Promise<void>;
}
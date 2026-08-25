import { GuildBasedChannel, TextChannel } from 'discord.js';
import { IChannelService } from './interfaces/IChannelService.js';

export class ChannelService implements IChannelService {
  public isSillyAllowed(channel: GuildBasedChannel): boolean {
    if (channel == null) return false;
    const textChannel = channel as TextChannel;

    if (textChannel == null) return false;
    if (textChannel.name == 'bot-help') return true;
    if (textChannel.name.toLowerCase().includes('random')) return true;
    if (textChannel.name.toLowerCase().includes('meme')) return true;
    if (textChannel.name.toLowerCase().includes('rant')) return true;
    if (textChannel.name.toLowerCase().includes('quote')) return true;

    const parent = textChannel.parent;
    if (parent == null) return false;

    return parent.name == 'off-topic';
  }

}
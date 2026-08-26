import { GuildBasedChannel, TextChannel } from 'discord.js';
import { IChannelService } from './interfaces/IChannelService.js';

export class ChannelService implements IChannelService {
  public notifyOnThreadCreation(channel: GuildBasedChannel): boolean {
    if (channel == null) return false;
    const textChannel = channel as TextChannel;

    if (textChannel == null) return false;
    if (textChannel.name == 'announcements') return true;
    if (textChannel.name == 'general') return true;
    if (ChannelService.isChildOf(textChannel, 'info')) return true;
    if (ChannelService.isChildOf(textChannel, 'competitions')) return true;
    if (ChannelService.isChildOf(textChannel, 'team-activities')) return true;
    if (ChannelService.isChildOf(textChannel, 'resources')) return true;
    return false;
  }

  public isSillyAllowed(channel: GuildBasedChannel): boolean {
    if (channel == null) return false;
    const textChannel = channel as TextChannel;

    if (textChannel == null) return false;
    if (textChannel.name == 'bot-help') return true;
    if (textChannel.name.toLowerCase().includes('random')) return true;
    if (textChannel.name.toLowerCase().includes('meme')) return true;
    if (textChannel.name.toLowerCase().includes('rant')) return true;
    if (textChannel.name.toLowerCase().includes('quote')) return true;

    return ChannelService.isChildOf(textChannel, 'off-topic');
  }

  private static isChildOf(channel: TextChannel, name: string): boolean {
    if (channel.name == name) return true;

    let parent = channel.parent;
    if (parent == null) return false;

    do {
      if (parent.name == name) return true;
      parent = parent.parent;
    } while (parent != null);

    return false;
  }

}
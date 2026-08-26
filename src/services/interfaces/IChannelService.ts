import { GuildBasedChannel } from 'discord.js';

export interface IChannelService {
  isSillyAllowed(channel: GuildBasedChannel): boolean;
  notifyOnThreadCreation(channel: GuildBasedChannel): boolean;
}
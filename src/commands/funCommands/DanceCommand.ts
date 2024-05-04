import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';
import { ISong } from '../../models/ISong.js';
import { readFileSync } from 'fs';

export class DanceCommand implements ICommand {
  name: string = 'dance';
  description: string = 'Randomly selects an FRC Dance.';

  private getSongs(): ISong[] {
    return JSON.parse(readFileSync('data/songs.json').toString());
  }

  public trigger(message: Message): boolean {
    return message.content.toLowerCase().trim() == 'frc dance';
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    const songs = this.getSongs();
    let index = Math.floor(Math.random() * songs.length);
    const song = songs[index];

    let reply: string =
      `Try ${song.name}` +
      (song.artist.trim() != '' ? ` by ${song.artist}` : '') +
      `!\n${song.url}`;
    message.reply(reply);
  }
}

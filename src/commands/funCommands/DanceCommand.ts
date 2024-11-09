import { Message } from 'discord.js';
import { ISong } from '../../models/ISong.js';
import { readFileSync } from 'fs';
import { MessageCommand } from '../MessageCommand.js';

export class DanceCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'dance';
  public readonly description: string = 'Randomly selects an FRC Dance.';

  private getSongs(): ISong[] {
    return JSON.parse(readFileSync('data/songs.json').toString());
  }

  public override messageTrigger(message: Message): boolean {
    return message.content.toLowerCase().trim() == 'frc dance';
  }

  public override async execute(message: Message): Promise<void> {
    const songs = this.getSongs();
    const index = Math.floor(Math.random() * songs.length);
    const song = songs[index];

    const reply: string =
      `Try ${song.name}` +
      (song.artist.trim() != '' ? ` by ${song.artist}` : '') +
      `!\n${song.url}`;
    message.reply(reply);
  }
}

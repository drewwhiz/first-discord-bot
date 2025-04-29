import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { ISongDataService } from '../../dataservices/interfaces/ISongDataService.js';

export default class Dance extends SlashCommand {
  private readonly _songs: ISongDataService;

  public constructor(songs: ISongDataService) {
    super('dance', 'Get a random FRC dance song');
    this._songs = songs;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    return await super.build();
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (this._songs == null) {
      await interaction.reply('Sorry, nothing comes to mind!');
      return;
    }

    const songs = await this._songs.getAll();
    const index = Math.floor(Math.random() * songs.length);
    const song = songs[index];

    const reply =
      `Try ${song.name}` +
      (song.artist != null ? ` by ${song.artist}` : '') +
      `!\n${song.url}`;

    await interaction.reply(reply);
  }
}
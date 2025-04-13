import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';

export default class ChiefDelphiCommand extends SlashCommand {
  private static readonly _SEARCH: string = 'search';
  private static readonly CD_URL: string = 'https://www.chiefdelphi.com/search?q=';


  public constructor() {
    super('cd', 'Perform a search on Chief Delphi');
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {    
    return (await super.build())
      .addStringOption(option => 
        option
          .setName(ChiefDelphiCommand._SEARCH)
          .setDescription('The search to perform')
          .setRequired(true)
          .setMinLength(1)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const search = interaction.options.getString(ChiefDelphiCommand._SEARCH);
    if (search == null || search.length <= 0) {
      await interaction.reply('Insufficient search provided');
      return;
    }

    const url = ChiefDelphiCommand.CD_URL + encodeURIComponent(search);
    await interaction.reply(url);
  }
}
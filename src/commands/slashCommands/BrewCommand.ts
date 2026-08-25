import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';

export default class BrewCommand extends SlashCommand {
  public constructor() {
    super('brew', 'Brew a cup of coffee');
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    return (await super.build());
  }

  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('ERROR: HTTP 418');
  }
}
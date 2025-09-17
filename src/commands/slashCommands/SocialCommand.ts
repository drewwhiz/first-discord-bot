import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { Dictionary } from 'typescript-collections';

export default class SocialCommand extends SlashCommand {

  private static readonly _CHANNEL: string = 'channel';

  private static readonly _WEB: string = 'Website';
  private static readonly _FACEBOOK: string = 'Facebook';
  private static readonly _INSTAGRAM: string = 'Instagram';
  private static readonly _TIKTOK: string = 'TikTok';
  private static readonly _LINKEDIN: string = 'LinkedIn';

  private readonly _CHANNEL_LOOKUP: Dictionary<string, string> = new Dictionary<string, string>();
  
  public constructor() {
    super('social', 'Find the Critical Hit Social Media Channels');
    this._CHANNEL_LOOKUP.setValue(SocialCommand._WEB, '<https://criticalhitrobotics.org/>');
    this._CHANNEL_LOOKUP.setValue(SocialCommand._FACEBOOK, '<https://www.facebook.com/frc10101>');
    this._CHANNEL_LOOKUP.setValue(SocialCommand._INSTAGRAM, '<https://www.instagram.com/crit_hit10101/>');
    this._CHANNEL_LOOKUP.setValue(SocialCommand._LINKEDIN, '<https://www.linkedin.com/company/frc10101/>');
    this._CHANNEL_LOOKUP.setValue(SocialCommand._TIKTOK, '<https://www.tiktok.com/@frc10101>');
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {    
    return (await super.build())
      .addStringOption(option =>
        option
          .setName(SocialCommand._CHANNEL)
          .setDescription('The social media channel')
          .setRequired(false)
          .setChoices(
            { name: SocialCommand._WEB, value: SocialCommand._WEB },
            { name: SocialCommand._FACEBOOK, value: SocialCommand._FACEBOOK },
            { name: SocialCommand._INSTAGRAM, value: SocialCommand._INSTAGRAM },
            { name: SocialCommand._TIKTOK, value: SocialCommand._TIKTOK },
            { name: SocialCommand._LINKEDIN, value: SocialCommand._LINKEDIN }
          )
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const channel = interaction.options.getString(SocialCommand._CHANNEL);

    if (channel == null) {
      await interaction.reply(`## Team Social Media Links\n**${SocialCommand._WEB}:** ${this._CHANNEL_LOOKUP.getValue(SocialCommand._WEB)}\n**${SocialCommand._INSTAGRAM}:** ${this._CHANNEL_LOOKUP.getValue(SocialCommand._INSTAGRAM)}\n**${SocialCommand._LINKEDIN}:** ${this._CHANNEL_LOOKUP.getValue(SocialCommand._LINKEDIN)}\n**${SocialCommand._FACEBOOK}:** ${this._CHANNEL_LOOKUP.getValue(SocialCommand._FACEBOOK)}\n**${SocialCommand._TIKTOK}:** ${this._CHANNEL_LOOKUP.getValue(SocialCommand._TIKTOK)}`);
      return;
    }

    const address = this._CHANNEL_LOOKUP.getValue(channel);
    if (address == null) {
      await interaction.reply(`Sorry, we don't have an account on ${channel}.`);
      return;
    }

    if (channel == SocialCommand._WEB) {
      await interaction.reply(`Visit us on the WORLD WIDE WEB at ${address}.`);
      return;
    }

    await interaction.reply(`Find us on ${channel} at ${address}!`);
  }
}
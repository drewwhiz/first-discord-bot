import { APIApplicationCommandOptionChoice, ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from './SlashCommand.js';
import { IBrandColorDataService } from '../../dataservices/interfaces/IBrandColorDataService.js';
import { ColorUtilities } from '../../utility/ColorUtilities.js';

export default class BrandCommand extends SlashCommand {
  private static readonly _ENTITY: string = 'entity';

  private readonly _brandColors: IBrandColorDataService;

  public constructor(brandColors: IBrandColorDataService) {
    super('brand', 'Retrieve branding information');
    this._brandColors = brandColors;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    if (this._brandColors == null) return await super.build();
    const brands = (await this._brandColors.getBrands()).map(b => {
      const value = { name: b, value: b } as APIApplicationCommandOptionChoice<string>;
      return value;
    });

    return (await super.build())
      .addStringOption(option => 
        option
          .setName(BrandCommand._ENTITY)
          .setDescription('The entity to lookup')
          .setRequired(true)
          .setChoices(...brands)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const brand = (interaction.options.get(BrandCommand._ENTITY).value as string)?.toUpperCase();
    if (brand == null) return;

    const colors = await this._brandColors.getByBrand(brand);
    if (colors == null || colors.length == 0) return;

    const header = `The colors used by ${brand} include these hexcodes:`;
    const lines = colors.map(c => c.hexcode);
    const reply = header + lines.map(l => `\n- ${l}`).join('');
    const images = await Promise.all(lines.map(async l => await ColorUtilities.createRGBImageFromHex(l)).filter(i => i != null));

    await interaction.reply({
      content: reply,
      files: images
    });
  }
}
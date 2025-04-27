import { APIApplicationCommandOptionChoice, ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { IVendorDataService } from '../../dataservices/interfaces/IVendorDataService.js';

export default class PartLookupCommand extends SlashCommand {
  private static readonly _VENDOR: string = 'vendor';
  private static readonly _PART_NUMBER: string = 'part-number';

  private readonly _vendors: IVendorDataService;

  public constructor(vendors: IVendorDataService) {
    super('part', 'Lookup a part by part-number');
    this._vendors = vendors;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    if (this._vendors == null) return await super.build();
    const vendors = (await this._vendors.getVendors()).map(b => {
      const value = { name: b.source, value: b.id } as APIApplicationCommandOptionChoice<number>;
      return value;
    });

    return (await super.build())
      .addIntegerOption(option => 
        option
          .setName(PartLookupCommand._VENDOR)
          .setDescription('The vendor of the part')
          .setRequired(true)
          .setChoices(...vendors)
      )
      .addStringOption(option => 
        option
          .setName(PartLookupCommand._PART_NUMBER)
          .setDescription('The part number (with or without prefix')
          .setRequired(true)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const vendorId = interaction.options.getInteger(PartLookupCommand._VENDOR);
    if (vendorId == null) {
      await interaction.reply('Invalid vendor provided');
      return;
    }

    const vendor = await this._vendors.get(vendorId);
    if (vendor == null) {
      await interaction.reply('Vendor could not be determined');
      return;
    }

    const partNumber = interaction.options.getString(PartLookupCommand._PART_NUMBER)?.trim();
    if (partNumber == null || partNumber.includes(' ')) {
      await interaction.reply('Invalid part number provided');
      return;
    }

    const prefixInvariant = vendor.prefix.toUpperCase();
    const partNumberInvariant = partNumber.toUpperCase();

    let partLookup = vendor.prefix;
    if (partNumberInvariant.includes(prefixInvariant) && partNumberInvariant.length <= prefixInvariant.length) {
      await interaction.reply('Invalid part number provided');
      return;
    } else if (partNumberInvariant.includes(prefixInvariant)) {
      partLookup += partNumber.substring(partNumberInvariant.indexOf(prefixInvariant) + prefixInvariant.length);
    } else {
      partLookup += partNumber;
    }

    partLookup = partLookup.trim();

    if (partLookup.endsWith(vendor.prefix)) {
      await interaction.reply('Invalid part number provided');
      return;
    }

    const encodedContent = encodeURIComponent(partLookup);
    const url = vendor.url_format.replace('{0}', encodedContent);
    await interaction.reply(url);
  }
}
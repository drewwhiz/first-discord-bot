import { Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { IBrandColorDataService } from '../../dataservices/interfaces/IBrandColorDataService.js';
import { ColorUtilities } from '../../utility/ColorUtilities.js';

export class BrandCommand implements IMessageCommand {
  public name: string = 'brand';
  public description: string = 'Reports branding colors';

  private readonly _brandColors: IBrandColorDataService;

  public constructor(brandColors: IBrandColorDataService) {
    this._brandColors = brandColors;
  }

  public trigger(message: Message): boolean {
    return message.content.toLowerCase().stripPunctuation().trim().startsWith('brand ');
  }

  public async execute(message: Message): Promise<void> {
    const invariant = message.content.toLowerCase().stripPunctuation().trim().substring(5).trim();
    if (invariant.length === 0) return;
    const brand = invariant.toUpperCase();
    const colors = await this._brandColors.getByBrand(brand);
    if (colors == null || colors.length == 0) return;

    const header = `The colors used by ${brand} include these hexcodes:`;
    const lines = colors.map(c => c.hexcode);
    const reply = header + lines.map(l => `\n- ${l}`).join('');
    const images = await Promise.all(lines.map(async l => await ColorUtilities.createRGBImageFromHex(l)).filter(i => i != null));

    await message.reply({
      content: reply,
      files: images
    }); return;
  }
}

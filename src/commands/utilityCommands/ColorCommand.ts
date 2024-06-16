import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { ColorUtilities } from '../../utility/ColorUtilities.js';

export class ColorCommand implements ICommand {
  public readonly name: string = 'color';
  public readonly description: string = 'Generates a color from an RGB code';

  private static convertPotentialHexCode(input: string): number[] {
    if (input == null) return null;

    const invariant = input.toLowerCase().trim();
    if (invariant.length != 7) return null;
    if (!invariant.startsWith('#')) return null;

    const red = parseInt(invariant.substring(1, 3), 16);
    if (!Number.isInteger(red) || red < 0 || red > 255) return null;

    const green = parseInt(invariant.substring(3, 5), 16);
    if (!Number.isInteger(green) || green < 0 || green > 255) return null;

    const blue = parseInt(invariant.substring(5, 7), 16);
    if (!Number.isInteger(blue) || blue < 0 || blue > 255) return null;

    return [red, green, blue];
  }

  private static convertRGBA(codes: string[]): number[] {
    if (codes.length != 4) return null;
    const colors = this.convertRGB(codes);
    if (colors == null) return null;

    const alpha = Number(codes[3]);
    if (Number.isNaN(alpha) || alpha < 0 || alpha > 1) return null;
    colors.push(alpha);
    return colors;
  }

  private static convertRGB(codes: string[]): number[] {
    const red = Number(codes[0]);
    if (!Number.isInteger(red) || red < 0 || red > 255) return null;

    const green = Number(codes[1]);
    if (!Number.isInteger(green) || green < 0 || green > 255) return null;

    const blue = Number(codes[2]);
    if (!Number.isInteger(blue) || blue < 0 || blue > 255) return null;

    return [red, green, blue];
  }

  private static convertPotentialRGB(input: string): number[] {
    if (input == null) return null;

    let invariant = input.toLowerCase().trim();
    let treatAsRGBA = null;
    if (invariant.startsWith('rgba')) {
      invariant = invariant.substring(4);
      treatAsRGBA = true;
    } else if (invariant.startsWith('rgb')) {
      invariant = invariant.substring(3);
      treatAsRGBA = false;
    } else {
      treatAsRGBA = null;
    }

    if (invariant.startsWith('(')) invariant = invariant.replaceAll('(', '');
    if (invariant.endsWith(')')) invariant = invariant.replaceAll(')', '');

    invariant = invariant
      .replaceAll(/[\s]/g, ' ')
      .replaceAll(' ', ',')
      .trim();

    const codes = invariant
      .split(',')
      .map(v => v.trim())
      .filter(v => v != null && v.length > 0);
    if (codes.length != 3 && codes.length != 4) return null;
    if (codes.length === 3 && treatAsRGBA != true) return ColorCommand.convertRGB(codes);
    if (codes.length === 4 && treatAsRGBA != false) return ColorCommand.convertRGBA(codes);
    return null;
  }

  public trigger(message: Message): boolean {
    if (ColorCommand.convertPotentialHexCode(message.content) != null) return true;
    if (ColorCommand.convertPotentialRGB(message.content) != null) return true;
    return false;
  }

  public async execute(message: Message): Promise<void> {
    let colors = ColorCommand.convertPotentialHexCode(message.content);
    if (colors != null) {
      await message.reply({
        files: [{
          attachment: await ColorUtilities.createRGBImage(colors, 2048)
        }]
      });
      return;
    }

    colors = ColorCommand.convertPotentialRGB(message.content);
    if (colors == null) return;

    if (colors.length === 3) {
      await message.reply({
        files: [{
          attachment: await ColorUtilities.createRGBImage(colors, 2048)
        }]
      }); return;
    }

    if (colors.length === 4) {
      await message.reply({
        files: [{
          attachment: await ColorUtilities.createRGBAImage(colors, 2048)
        }]
      }); return;
    }
  }
}

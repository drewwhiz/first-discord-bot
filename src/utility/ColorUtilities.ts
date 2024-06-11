import sharp from 'sharp';

export class ColorUtilities {
  public static async createRGBImageFromHex(hexcode: string): Promise<Buffer> {
    const red = parseInt(hexcode.substring(1, 3), 16);
    const green = parseInt(hexcode.substring(3, 5), 16);
    const blue = parseInt(hexcode.substring(5, 7), 16);

    if (Number.isNaN(red) || Number.isNaN(blue) || Number.isNaN(green)) return null;
    if (red < 0 || blue < 0 || green < 0) return null;
    if (red > 255 || blue > 255 || green > 255) return null;

    return await this.createRGBImage([red, green, blue], 25);
  }

  public static async createRGBImage(colors: number[], side: number): Promise<Buffer> {
    return await sharp({
      create: {
        width: side,
        height: side,
        channels: 3,
        background: { r: colors[0], g: colors[1], b: colors[2] }
      }
    })
      .png()
      .toBuffer();
  }

  public static async createRGBAImage(colors: number[], side: number): Promise<Buffer> {
    return await sharp({
      create: {
        width: side,
        height: side,
        channels: 4,
        background: { r: colors[0], g: colors[1], b: colors[2], alpha: colors[3] }
      }
    })
      .png()
      .toBuffer();
  }
}
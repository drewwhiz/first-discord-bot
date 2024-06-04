import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import winston from 'winston';
import convert, { Unit } from 'convert-units';

const { debug } = winston;

export class ConvertUnitCommand implements ICommand {
  private static readonly CONVERT_WORD = 'convert';
  private static readonly TO_WORD = ' to ';
  private static readonly CONVERT_REGEX = /^convert .* .* to .*$/;
  private static readonly HELP = 'convert help';

  public name: string = 'convert';
  public description: string = 'converts units';

  public trigger(message: Message): boolean {
    const content = message.content.toLowerCase().trim();
    if (content.stripPunctuation().trim() === ConvertUnitCommand.HELP) return true;
    return ConvertUnitCommand.CONVERT_REGEX.test(content);
  }

  private static parseInput(input: string): [number, Unit] {
    const lastSpace = input.lastIndexOf(' ');
    if (lastSpace < 1) return null;

    const inputNumber = input.substring(0, lastSpace).trim();
    const parsedNumber = parseFloat(inputNumber);
    if (isNaN(parsedNumber)) return null;

    const inputUnit = input.substring(lastSpace).replaceAll(/\s/g, '').replaceAll('^', '').trim();
    if (inputUnit.length == 0) return null;

    try {
      return [parsedNumber, inputUnit as Unit];
    } catch (e) {
      debug(e.toString());
      return null;
    }
  }

  public async execute(message: Message): Promise<void> {
    const trimmedContent = message.content.trim();
    if (trimmedContent.stripPunctuation().toLowerCase().trim() === ConvertUnitCommand.HELP) {
      const reply = '`convert [value] [unit] to [unit]`\n'
        + 'For example: `convert 1 in to cm`\n\n'
        + 'Supported units include:'
        + '\n- Length: mm, cm, m, km, in, yd, ft-us, ft, mi'
        + '\n- Area: mm2, cm2, m2, ha, km2, in2, yd2, ft2, ac, mi2'
        + '\n- Mass/Weight: mcg, mg, g, kg, mt, oz, lb, t'
        + '\n- Volume: mm3, cm3, ml, cl, dl, l, kl, m3, km3, krm, tsk, msk, kkp, glas, kanna, tsp, Tbs, in3, fl-oz, cup, pnt, qt, gal, ft3, yd3'
        + '\n- Count: ea, dz'
        + '\n- Temperature: C, K, F, R'
        + '\n- Time: ns, mu, ms, s, min, h, d, week, month, year'
        + '\n- Digital: b, Kb, Mb, Gb, Tb, B, KB, MB, GB, TB (1024, not 1000)'
        + '\n- Parts Per: ppm, ppb, ppt, ppq'
        + '\n- Speed: m/s, km/h, m/h, knot, ft/s'
        + '\n- Pace: min/km, s/m, min/mi, s/ft'
        + '\n- Pressure: Pa, kPa, MPa, hPa, bar, torr, psi, ksi'
        + '\n- Current: A, mA, kA'
        + '\n- Voltage: V, mV, kV'
        + '\n- Power: W, mW, kW, MW, GW'
        + '\n- Reactive Power: VAR, mVAR, kVAR, MVAR, GVAR'
        + '\n- Apparent Power: VA, mVA, kVA, MVA, GVA'
        + '\n- Energy: Wh, mWh, kWh, MWh, GWh, J, kJ'
        + '\n- Reactive Energy: VARh, mVARh, kVARh, MVARh, GVARh'
        + '\n- Volume Flow Rate: mm3/s, cm3/s, ml/s, cl/s, dl/s, l/s, l/min, l/h, kl/s, kl/min, kl/h, m3/s, m3/min, m3/h, km3/s, tsp/s, Tbs/s, in3/s, in3/min, in3/h, fl-oz/s, fl-oz/min, fl-oz/h, cup/s, pnt/s, pnt/min, pnt/h, qt/s, gal/s, gal/min, gal/h, ft3/s, ft3/min, ft3/h, yd3/s, yd3/min, yd3/h'
        + '\n- Illuminance: lx, ft-cd'
        + '\n- Frequency: mHz, Hz, kHz, MHz, GHz, THz, rpm, deg/s, rad/s'
        + '\n- Angle: rad, deg, grad, arcmin, arcsec';
      await message.reply(reply);
      return;
    }

    const postConvert = trimmedContent.substring(ConvertUnitCommand.CONVERT_WORD.length).trim();
    const toIndex = postConvert.toLowerCase().indexOf(ConvertUnitCommand.TO_WORD);
    if (toIndex <= 0) return;

    const originalInput = postConvert.substring(0, toIndex).trim();
    const originalOutput = postConvert.substring(toIndex + ConvertUnitCommand.TO_WORD.length).replaceAll(/\s/g, '').trim();
    const [inputNumber, inputUnit] = ConvertUnitCommand.parseInput(originalInput);
    const outputUnit = postConvert.substring(toIndex + ConvertUnitCommand.TO_WORD.length).replaceAll(/\s/g, '').replaceAll('^', '').trim();

    try {
      const result = Math.round(100000 * convert(inputNumber).from(inputUnit).to(outputUnit as Unit)) / 100000;
      await message.reply(`${originalInput} is equivalent to ${result} ${originalOutput}`);
    } catch (e) {
      debug(e.toString());
      return;
    }
  }
}

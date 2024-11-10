import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import winston from 'winston';
import { Unit, evaluate } from 'mathjs';
import { MessageCommand } from '../MessageCommand.js';

const { debug } = winston;

export class ConvertUnitCommand extends MessageCommand {
  public override isSilly: boolean = false;
  private static readonly CONVERT_WORD = 'convert';
  private static readonly TO_WORD = ' to ';
  private static readonly CONVERT_REGEX = /^convert .* .* to .*$/;
  private static readonly HELP = 'convert help';

  public readonly name: string = 'convert';
  public readonly description: string = 'converts units';

  public override messageTrigger(message: Message): boolean {
    const content = message.content.toLowerCase().trim();
    if (content.stripPunctuation().trim().startsWith(ConvertUnitCommand.HELP)) return true;
    return ConvertUnitCommand.CONVERT_REGEX.test(content);
  }

  private static async convertHelp(message: Message): Promise<void> {
    const invariant = message.content.toLowerCase().trim();
    if (!invariant.startsWith(this.HELP)) return;

    if (invariant == this.HELP) {
      const reply = '`convert [expression] [unit] to [unit]`\n'
        + 'For example:'
        + '\n-`convert 1 in to cm`'
        + '\n-`convert (2 pi/3) rad to deg`'
        + '\n\n'
        + 'Note: Expressions must use parentheses if fractions are involved so the units are interpreted correctly.'
        + '\n\n'
        + 'Decimal prefixes `quecto` through `deci` and `deca` through `quetta` are supported, as are binary prefixes `kibi` through `yobi`. Use `convert help prefix` for more information.\n\n'
        + 'Supported measurement types include: Length, Surface Area, Volume, Liquid Volume, Angles, Time, Frequency, Mass, Electric Current, Temperature, Amount of Substance, Luminous Intensity, Force, Energy, Power, Pressure, Electricity and Magnetism, and Binary.\n\n'
        + 'For a list of units in a given category, `convert help [Measurement]`';
      await message.reply(reply);
      return;
    }

    const measurement = invariant.replace(this.HELP, '').stripPunctuation().trim().toLowerCase();
    if (measurement === 'prefix' || measurement === 'prefixes') {
      const reply = 'Supported decimal prefixes include:'
        + '\n- `deca` (`da`)'
        + '\n- `hecto` (`h`)'
        + '\n- `kilo` (`k`)'
        + '\n- `mega` (`M`)'
        + '\n- `giga` (`G`)'
        + '\n- `tera` (`T`)'
        + '\n- `peta` (`P`)'
        + '\n- `exa` (`E`)'
        + '\n- `zetta` (`Z`)'
        + '\n- `yotta` (`Y`)'
        + '\n- `ronna` (`R`)'
        + '\n- `quetta` (`Q`)'
        + '\n- `deci` (`d`)'
        + '\n- `centi` (`c`)'
        + '\n- `milli` (`m`)'
        + '\n- `micro` (`u`)'
        + '\n- `nano` (`n`)'
        + '\n- `pico` (`p`)'
        + '\n- `femto` (`f`)'
        + '\n- `atto` (`a`)'
        + '\n- `zepto` (`z`)'
        + '\n- `yocto` (`y`)'
        + '\n- `ronto` (`r`)'
        + '\n- `quecto` (`q`)'
        + '\n\n'
        + 'Supported binary prefixes include:'
        + '\n- `kibi` (`Ki`)'
        + '\n- `mebi` (`Mi`)'
        + '\n- `gibi` (`Gi`)'
        + '\n- `tebi` (`Ti`)'
        + '\n- `pebi` (`Pi`)'
        + '\n- `exi` (`Ei`)'
        + '\n- `zebi` (`Zi`)'
        + '\n- `yobi` (`Yi`)';
      await message.reply(reply);
      return;
    }

    const unitList = this.getUnitList(measurement);
    if (unitList == null) return;

    const lines = unitList.map(u => `\n- ${u}`).join('');
    await message.reply(`Supported units include:${lines}`);
  }

  private static getUnitList(measurement: string): string[] {
    switch (measurement) {
    case 'length':
    case 'width':
    case 'height':
    case 'depth':
      return ['meter (m)', 'inch (in)', 'foot (ft)', 'yard (yd)', 'mile (mi)', 'link (li)', 'rod (rd)', 'chain (ch)', 'angstrom', 'mil'];
    case 'surface area':
    case 'surfacearea':
    case 'area':
      return ['m2', 'sqin', 'sqft', 'sqyd', 'sqmi', 'sqrd', 'sqch', 'sqmil', 'acre', 'hectare'];
    case 'volume':
      return ['m3', 'litre (l, L, lt, liter)', 'cc', 'cuin', 'cuft', 'cuyd', 'teaspoon', 'tablespoon'];
    case 'liquid volume':
    case 'liquidvolume':
    case 'liqvolume':
      return ['minim', 'fluiddram (fldr)', 'fluidounce (floz)', 'gill (gi)', 'cup (cp)', 'pint (pt)', 'quart (qt)', 'gallon (gal)', 'beerbarrel (bbl)', 'oilbarrel (obl)', 'hogshead', 'drop (gtt)'];
    case 'angle':
    case 'angles':
      return ['rad (radian)', 'deg (degree)', 'grad (gradian)', 'cycle', 'arcsec (arcsecond)', 'arcmin (arcminute)'];
    case 'time':
      return ['second (s, secs, seconds)', 'minute (min, mins, minutes)', 'hour (h, hr, hrs, hours)', 'day (days)', 'week (weeks)', 'month (months)', 'year (years)', 'decade (decades)', 'century (centuries)', 'millennium (millennia)'];
    case 'frequency':
      return ['hertz (Hz)'];
    case 'mass':
      return ['gram(g)', 'tonne', 'ton', 'grain (gr)', 'dram (dr)', 'ounce (oz)', 'poundmass (lbm, lb, lbs)', 'hundredweight (cwt)', 'stick', 'stone'];
    case 'electric current':
    case 'electriccurrent':
    case 'current':
      return ['ampere (A)'];
    case 'temperature':
    case 'temp':
      return ['kelvin (K)', 'celsius (degC)', 'fahrenheit (degF)', 'rankine (degR)'];
    case 'amount':
    case 'amountofsubstance':
    case 'substance':
    case 'amt':
      return ['mole (mol)'];
    case 'luminousintensity':
    case 'luminous':
    case 'li':
      return ['candela (cd)'];
    case 'force':
    case 'weight':
      return ['newton (N)', 'dyne (dyn)', 'poundforce (lbf)', 'kip'];
    case 'energy':
      return ['joule (J)', 'erg', 'Wh', 'BTU', 'electronvolt (eV)'];
    case 'power':
      return ['watt (W)', 'hp'];
    case 'pressure':
      return ['Pa', 'psi', 'atm', 'torr', 'bar', 'mmHg', 'mmH2O', 'cmH2O'];
    case 'electricityandmagnetism':
    case 'electricitymagnetism':
    case 'electricity':
    case 'magnetism':
    case 'electromagnetism':
    case 'electromagnetic':
      return ['ampere (A)', 'coulomb (C)', 'watt (W)', 'volt (V)', 'ohm', 'farad (F)', 'weber (Wb)', 'tesla (T)', 'henry (H)', 'siemens (S)', 'electronvolt (eV)'];
    case 'binary':
      return ['bits (b)', 'bytes (B)'];
    default:
      return null;
    }
  }

  public override async execute(message: Message): Promise<void> {
    const trimmedContent = message.content.trim();
    if (trimmedContent.stripPunctuation().toLowerCase().trim().startsWith(ConvertUnitCommand.HELP)) {
      await ConvertUnitCommand.convertHelp(message);
      return;
    }

    const postConvert = trimmedContent.substring(ConvertUnitCommand.CONVERT_WORD.length).trim();
    const result = ConvertUnitCommand.computeConversion(postConvert);
    if (result == null) return;

    const preTo = postConvert.substring(0, postConvert.indexOf(ConvertUnitCommand.TO_WORD)).trim();
    const postTo = postConvert.substring(postConvert.indexOf(ConvertUnitCommand.TO_WORD) + ConvertUnitCommand.TO_WORD.length).trim();
    const roundedResult = parseFloat(result.toNumber().toPrecision(15));
    await message.reply(`${preTo} is equivalent to ${roundedResult} ${postTo}`);
  }

  private static computeConversion(input: string): Unit {
    try {
      return evaluate(input) as Unit;
    } catch (e) {
      debug(e.toString());
      return null;
    }
  }
}

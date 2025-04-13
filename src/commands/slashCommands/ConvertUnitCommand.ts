import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from './SlashCommand.js';
import { evaluate, Unit } from 'mathjs';
import { debug } from 'winston';

export default class ConvertUnitCommand extends SlashCommand {
  private static readonly _FROM: string = 'from';
  private static readonly _TO: string = 'to';


  public constructor() {
    super('convert', 'Converts units');
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {    
    return (await super.build())
      .addStringOption(option => 
        option
          .setName(ConvertUnitCommand._FROM)
          .setDescription('The value to convert')
          .setRequired(true)
          .setMinLength(1)
      )
      .addStringOption(option => 
        option
          .setName(ConvertUnitCommand._TO)
          .setDescription('The unit to convert to')
          .setRequired(true)
          .setMinLength(1)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const from = interaction.options.get(ConvertUnitCommand._FROM)?.value as string;
    if (from == null) return;
    if (from.length <= 0) return;

    const to = interaction.options.get(ConvertUnitCommand._TO)?.value as string;
    if (to == null) return;
    if (to.length <= 0) return;

    const convertPhrase = `${from} to ${to}`;
    const conversion = ConvertUnitCommand.computeConversion(convertPhrase);
    if (conversion == null) return;

    const roundedResult = parseFloat(conversion.toNumber().toPrecision(15));

    await interaction.reply(`${from} is equivalent to ${roundedResult} ${to}`);
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
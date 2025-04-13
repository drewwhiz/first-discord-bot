import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { evaluate, Unit } from 'mathjs';
import winston from 'winston';

const { debug } = winston;

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
    const from = interaction.options.getString(ConvertUnitCommand._FROM);
    const to = interaction.options.getString(ConvertUnitCommand._TO);
    if (from == null || from.length <= 0 || to == null || to.length <= 0) {
      await interaction.reply('Unable to parse input parameters');
      return;
    }

    const convertPhrase = `${from} to ${to}`;
    const conversion = ConvertUnitCommand.computeConversion(convertPhrase);
    if (conversion == null) {
      await interaction.reply('Unable to perform conversion');
      return;
    }

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
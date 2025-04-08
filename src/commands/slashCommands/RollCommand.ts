import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from './SlashCommand.js';
import { IRandomNumberService } from '../../services/interfaces/IRandomNumberService.js';

export default class RollCommand extends SlashCommand {
  private static readonly _SIDES: string = 'sides';
  private static readonly _COUNT: string = 'count';
  private readonly _random: IRandomNumberService;

  public constructor(random: IRandomNumberService) {
    super('roll', 'Roll a die');
    this._random = random;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    if (this._random == null) return await super.build();
    
    return (await super.build())
      .addIntegerOption(option => 
        option
          .setName(RollCommand._SIDES)
          .setDescription('The number of sides')
          .setRequired(true)
          .setMinValue(1)
      )
      .addIntegerOption(option => 
        option
          .setName(RollCommand._COUNT)
          .setDescription('The number of times to roll')
          .setRequired(false)
          .setMinValue(1)
      );
  }

  private async roll(interaction: ChatInputCommandInteraction, max: number, count: number): Promise<void> {
    const rolls = this._random.getMultipleRolls(max, count);
    if (count == 1) {
      await interaction.reply(`I got ${rolls[0]}. Do with that information what you will.`);
      return;
    }

    const maxValue = Math.max(...rolls);
    const minValue = Math.min(...rolls);
    const total = rolls.reduce((partialSum, a) => partialSum + a, 0);
    const average = total / count;
    const standardDeviation = Math.sqrt(rolls.reduce((partialSum, a) => partialSum + Math.pow(a - average, 2), 0) / (count - 1));

    const reply = `I rolled from 1 to ${max} a total of ${count} times - here's what I got!`
      + `\n- Maximum: ${maxValue}`
      + `\n- Minimum: ${minValue}`
      + `\n- Sum: ${total}`
      + `\n- Average: ${average}`
      + `\n- Standard Deviation: ${standardDeviation}`;

    await interaction.reply(reply);
    return;
  }

  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const sides = interaction.options.get(RollCommand._SIDES)?.value as number;
    if (sides == null) return;

    let count = interaction.options.get(RollCommand._COUNT)?.value as number;
    if (count == null) count = 1;

    return await this.roll(interaction, sides, count);
  }
}
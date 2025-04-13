import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { IRandomNumberService } from '../../services/interfaces/IRandomNumberService.js';

export default class FlipCommand extends SlashCommand {
  private static readonly _COUNT: string = 'count';
  private readonly _random: IRandomNumberService;

  public constructor(random: IRandomNumberService) {
    super('flip', 'Flip a coin');
    this._random = random;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    if (this._random == null) return await super.build();
    
    return (await super.build())
      .addIntegerOption(option => 
        option
          .setName(FlipCommand._COUNT)
          .setDescription('The number of times to flip')
          .setRequired(false)
          .setMinValue(1)
      );
  }

  private async flip(interaction: ChatInputCommandInteraction, count: number): Promise<void> {
    if (count == 1) {
      await interaction.reply(`I got ${this._random.isHeads() ? 'heads' : 'tails'}!`);
      return;
    }

    let heads = 0;
    for (let i = 0; i < count; i++) {
      if (this._random.isHeads()) heads++;
    }

    const tails = count - heads;
    await interaction.reply(`I got ${heads} heads and ${tails} tails! (And none on their side... again.)`);
    return;
  }

  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let count = interaction.options.getInteger(FlipCommand._COUNT);
    if (count == null || count == 0) count = 1;

    return await this.flip(interaction, count);
  }
}
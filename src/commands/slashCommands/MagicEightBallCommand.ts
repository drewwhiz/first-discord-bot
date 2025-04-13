import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { IRandomNumberService } from '../../services/interfaces/IRandomNumberService.js';

export default class MagicEightBallCommand extends SlashCommand {
  private static readonly _QUESTION: string = 'question';
  private readonly _random: IRandomNumberService;

  private static readonly ANSWERS: string[] = [
    'It is certain',
    'Reply hazy, try again',
    'Don\'t count on it',
    'It is decidedly so',
    'Ask again later',
    'My reply is no',
    'Without a doubt',
    'Better not tell you now',
    'My sources say no',
    'Yes definitely',
    'Cannot predict now',
    'Outlook not so good',
    'You may rely on it',
    'Concentrate and ask again',
    'Very doubtful',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes'
  ];

  public constructor(random: IRandomNumberService) {
    super('magic-8-ball', 'Ask a yes or no question!');
    this._random = random;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    if (this._random == null) return await super.build();
    
    return (await super.build())
      .addStringOption(option => 
        option
          .setName(MagicEightBallCommand._QUESTION)
          .setDescription('Your (yes or no) question')
          .setRequired(true)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const question = interaction.options.getString(MagicEightBallCommand._QUESTION);
    if (question == null || question.length <= 0) {
      await interaction.reply('Could not determine the question');
      return;
    }
    
    const roll = this._random.getSingleRoll(MagicEightBallCommand.ANSWERS.length);
    const message = MagicEightBallCommand.ANSWERS[roll - 1];
    await interaction.reply(message);
  }
}
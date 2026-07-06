import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';

export default class CubeRuleCommand extends SlashCommand {
    private static readonly _NAME: string = 'food';
    private static readonly _SIDES: string = 'sides_with_bread';

    private static readonly _URL: string = 'https://cuberule.com';

    private static readonly _CATEGORIES: string[] = [
        'salad',
        'toast',
        'sandwich',
        'taco',
        'sushi',
        'quiche',
        'calzone',
        'cake',
        'nachos'
    ];

    public constructor() {
        super('cube_rule', 'Figure out if a food is a sandwich, or something else.');
    }

    public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
        return (await super.build())
            .addNumberOption(option =>
                option
                    .setName(CubeRuleCommand._SIDES)
                    .setDescription('The number of sides covered in carbs')
                    .setRequired(false)
                    .setMaxValue(6)
                    .setMinValue(0)
            )
            .addStringOption(option =>
                option
                    .setName(CubeRuleCommand._NAME)
                    .setDescription('The food to consider')
                    .setRequired(false)
            );
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        let food = interaction.options.getString(CubeRuleCommand._NAME);
        let sides = interaction.options.getNumber(CubeRuleCommand._SIDES);

        if (food == null || food.trim().length == 0) food = 'your food';

        if (sides == null) {
            await interaction.reply(`If ${food.toLowerCase()} is surrounded by carbs on between 0 and 6 sides (visualizing the food as a cube), it could be any of: ${CubeRuleCommand._CATEGORIES.slice(0, 7).join(', ')}.`)
            await interaction.followUp(`If ${food.toLowerCase()} is layered like pancakes, though, it would be **${CubeRuleCommand._CATEGORIES[7].toUpperCase()}**.`)
            await interaction.followUp(`If ${food.toLowerCase()} is many small pieces like a salad with croutons, though, it would be **${CubeRuleCommand._CATEGORIES[8].toUpperCase()}**.`)
            await interaction.followUp(`See more at <${CubeRuleCommand._URL}>.`);
            return;
        }

        const category = CubeRuleCommand._CATEGORIES[sides];
        if (food == null || food.trim().length == 0) food = 'your food';

        await interaction.reply(`Visualized as a cube with ${sides} sides of carbs, ${food.toLowerCase()} is most likely categorized as... **${category.toUpperCase()}**!`);
        await interaction.followUp(`See more at <${CubeRuleCommand._URL}>`);
    }
}
import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { MessageUtilities } from '../../utility/MessageUtilities.js';

export default class UserRoleLookupCommand extends SlashCommand {
  private static readonly _USER: string = 'user';
  public constructor() {
    super('user-roles', 'Lookup the roles for a given user');
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {    
    return (await super.build())
      .addUserOption(option => 
        option
          .setName(UserRoleLookupCommand._USER)
          .setDescription('The user to look up')
          .setRequired(true)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const user = interaction.options.getUser(UserRoleLookupCommand._USER);
    if (user == null) {
      await interaction.reply('No user? No problem. Thanks!');
      return;
    }

    await interaction.deferReply();

    const guild = interaction.guild;
    if (guild == null) {
      await interaction.editReply('No users to find!');
      return;
    }

    const userRoles = (await guild.members.fetch(user.id)).roles.valueOf().map(r => r.name);
    if (userRoles == null || userRoles.length == 0) {
      await interaction.editReply('No roles for that user.');
      return;
    }

    const messages = MessageUtilities.generateMessages(userRoles);
    await interaction.editReply('I found these roles:');
    for (let i = 0; i < messages.length; i++) {
      interaction.followUp(messages[i]);
    }
  }
}
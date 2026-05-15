import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { MessageUtilities } from '../../utility/MessageUtilities.js';

export default class RoleLookupCommand extends SlashCommand {
  private static readonly _ROLE: string = 'role';
  public constructor() {
    super('roles', 'Lookup the users with a given role');
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {    
    return (await super.build())
      .addRoleOption(option => 
        option
          .setName(RoleLookupCommand._ROLE)
          .setDescription('The role to look up')
          .setRequired(true)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const role = interaction.options.getRole(RoleLookupCommand._ROLE);
    if (role == null) {
      await interaction.reply('No role? No problem. Thanks!');
      return;
    }

    await interaction.deferReply();
    const guild = interaction.guild;
    if (guild == null) {
      await interaction.editReply('No users to find!');
      return;
    }

    const roles = guild.roles;
    if (roles == null) {
      await interaction.editReply('No users to find!');
      return;
    }

    const users = (await roles.fetch(role.id))?.members.map(m => m.user.displayName);
    if (users == null || users.length == 0) {
      await interaction.editReply('No users with that role.');
      return;
    }

    const messages = MessageUtilities.generateMessages(users);
    await interaction.editReply('I found these users:');
    for (let i = 0; i < messages.length; i++) {
      interaction.followUp(messages[i]);
    }
  }
}
import { ChatInputCommandInteraction, PermissionFlagsBits, PermissionResolvable, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from 'discord.js';

export type SlashCommandOptions = {
    requiredPermissions: PermissionResolvable[]
}

export default abstract class SlashCommand {
  public readonly name: string;
  public readonly description: string;

  public constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  public abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;

  public build(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .setName(this.name)
      .setDescription(this.description);
  }
}
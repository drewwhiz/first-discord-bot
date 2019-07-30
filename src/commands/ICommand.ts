import * as Discord from "discord.js";

export interface ICommand {
  name: string;
  triggers: string[];
  description: string;

  execute(message: Discord.Message, args: string[]): void;
}

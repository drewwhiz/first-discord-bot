import { Message } from "discord.js";
import { ICommand } from "../ICommand";

export class ManualCommand implements ICommand {
  public name: string = "manual";
  public description: string = "Tells people to read the manual.";

  public trigger(message: Message): boolean {
    if (message != null) {
      const words = message.content
        .toLowerCase()
        .replace(/[.,\/#!$?%\^&\*;:{}=\-_`~()]/g, "")
        .split("");

      return words.includes("rtm");
    }

    return false;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send(`In case ${message.author.username} wasn't clear, you should probably (R)EAD (T)HE (M)ANUAL!`);
  }
}

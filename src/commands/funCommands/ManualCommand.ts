import { Message } from "discord.js";
import { ICommand } from "../ICommand";
import "../../extensions/StringExtension";


export class ManualCommand implements ICommand {
  public name: string = "manual";
  public description: string = "Tells people to read the manual.";

  public trigger(message: Message): boolean {
    return message != null && message.content.containsAny("rtm");
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send(
      `In case ${message.member.displayName} wasn't clear, you should probably (R)EAD (T)HE (M)ANUAL!`);
  }
}

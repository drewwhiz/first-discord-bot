import { ICommand } from "../ICommand";
import { Message } from "discord.js";
import "../../extensions/StringExtension";

export class ImagineCommand implements ICommand {
  public name: string = "imagine";
  public description: string = "Couldn't be me";

  public trigger(message: Message): boolean {
    return message != null && message.content.isFirstWord("imagine");
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.reply("Couldn't be me.");
  }
}
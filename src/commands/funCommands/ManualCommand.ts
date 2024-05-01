import { Message } from "discord.js";
import { ICommand } from "../ICommand";
import "../../extensions/StringExtension";


export class ManualCommand implements ICommand {
  public name: string = "manual";
  public description: string = "Tells people to read the manual.";

  private getText(content: string): string {
    const invariant = content.toLowerCase();
    if (invariant.indexOf("rtm") >= 0) return "rtm";
    if (invariant.indexOf("rtfm") >= 0) return "rtfm";
    return null;
  }

  public trigger(message: Message): boolean {
    return this.getText(message?.content) != null;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    const acronym = this.getText(message?.content);
    const text = acronym === 'rtm' ? '(R)EAD (T)HE (M)ANUAL' : '(R)EAD (T)HE (F)IRST (M)ANUAL';
    message.channel.send(`In case that wasn't clear, you should probably ${text}!`);
  }
}

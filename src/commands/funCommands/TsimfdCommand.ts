import { ICommand } from "../ICommand.js";
import { Message } from "discord.js";
import "../../extensions/StringExtension.js";

export class TsimfdCommand implements ICommand {
    private static readonly TSIMFD: string = "TSIMFD";

    name: string = "TSIMFD";
    description: string = "Chimes in with an appropriate reaction.";

    public trigger(message: Message): boolean {
        return this.containsCoolOrEquivalent(message.content);
    }

    public async execute(message: Message, args: string[]): Promise<void> {
        message.reply(TsimfdCommand.TSIMFD);
    }

    private containsCoolOrEquivalent(text: string) {
        return text.containsAnyWords("cool", "awesome", "neat", "dope") || TsimfdCommand.TSIMFD === text.toUpperCase();
    }
}
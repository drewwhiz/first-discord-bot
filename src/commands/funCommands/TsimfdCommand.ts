import { ICommand } from "../ICommand";
import { Message, TextChannel } from "discord.js";
import "../../extensions/StringExtension";

export class TsimfdCommand implements ICommand {
    private static readonly TSIMFD: string = "TSIMFD";

    name: string = "TSIMFD";
    description: string = "Chimes in with an appropriate reaction.";

    public trigger(message: Message): boolean {
        return this.isAsking(message.content) || this.containsCoolOrEquivalent(message.content);
    }

    public async execute(message: Message, args: string[]): Promise<void> {
        if (this.isAsking(message.content)) {
            message.author.send("https://www.youtube.com/watch?v=ij8CkMm2fPw");

        } else if (this.containsCoolOrEquivalent(message.content)) {
            message.channel.send(TsimfdCommand.TSIMFD);
        }
    }

    private isAsking(text: string): boolean {
        return `${TsimfdCommand.TSIMFD}?` === text.toUpperCase();
    }

    private containsCoolOrEquivalent(text: string) {
        return text.containsAny("cool", "awesome", "neat", "dope") || TsimfdCommand.TSIMFD === text.toUpperCase();
    }

}
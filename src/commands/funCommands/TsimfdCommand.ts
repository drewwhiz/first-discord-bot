import { ICommand } from "../ICommand";
import { Message, TextChannel, Collection, Role } from "discord.js";
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
            if (message.guild === null) {
                return;
            }

            let allowedRoles = message.guild.roles.filter(r => r.name === "mentor" || r.name === "alumni").map(r => r.id);

            if (allowedRoles.map(r => message.member.roles.has(r)).length > 0) {
                message.author.send("https://www.youtube.com/watch?v=ij8CkMm2fPw");
            } else {
                message.author.send("Sorry, you'll have to ask a mentor or an alum.");
            }

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
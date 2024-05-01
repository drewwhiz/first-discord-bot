import { ICommand } from "../ICommand";
import { Message } from "discord.js";

export class AtMeCommand implements ICommand {
    name: string = "don't @ me";
    description: string = "If tagged, tell the user not to tag the bot.";

    trigger(message: Message): boolean {
        let user = message.mentions.users.find(user => user.username === 'FIRSTbot');
        return user !== null;
    }

    async execute(message: Message, args: string[]): Promise<void> {
        message.channel.send("Don't @ me.");
    }
}
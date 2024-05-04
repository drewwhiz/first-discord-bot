import { ICommand } from "../ICommand.js";
import { Message } from "discord.js";
import "../../extensions/StringExtension.js";

export class HearMeOutCommand implements ICommand {
    name: string = "Hear Me Out";
    description: string = "Chimes in with an appropriate response to 'Hear me out...'.";

    public trigger(message: Message): boolean {
        const content = message.content.stripPunctuation().trim().toLowerCase();
        return content.startsWith('hear me out') || (content.length < 30 && content.includes('hear me out'));
    }

    public async execute(message: Message, args: string[]): Promise<void> {
        message.reply('Listening...');
    }
}
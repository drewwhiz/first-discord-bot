import { ICommand } from "../ICommand";
import { Message, MessageType } from "discord.js";

export class YikesCommand implements ICommand {
    name: string = "yikes";
    description: string = "Uses a yikes reaction on the message being replied to. If not replying, just messages the emoji.";

    trigger(message: Message): boolean {
        return message.content.trim().toLowerCase() === 'yikes';
    }

    async execute(message: Message, args: string[]): Promise<void> {
        const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'annayikes');
        if (reactionEmoji == null) return;

        const isReply = message.type == MessageType.Reply;
        if (isReply) {
            const messageId = message.reference.messageId;
            const messageToReact =  await message.channel.messages.fetch(messageId);
            messageToReact.react(reactionEmoji);
            return;
        } else {
            message.channel.send(reactionEmoji.id);
        }
    }
}
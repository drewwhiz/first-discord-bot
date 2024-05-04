import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';
import { Dictionary } from 'typescript-collections';

export class RespectsCommand implements ICommand {
    private static COOLDOWN: number = 60 * 60 * 1000;

    name: string = 'respect';
    description: string = 'Press F to Pay Respects';

    private lastRespects: Dictionary<string, Date> = new Dictionary<string, Date>();

    trigger(message: Message): boolean {
        if (message == null) return false;
        const isF = message.content.stripPunctuation().trim().toLowerCase() == 'f';
        if (!isF) return false;

        const destination = message.channel?.id;
        if (destination == null) return false;

        const now = new Date();
        const lastRespect = this.lastRespects.getValue(destination);
        if (lastRespect == null) {
            this.lastRespects.setValue(destination, now);
            return true;
        }

        if (Math.abs(now.getTime() - lastRespect.getTime()) > RespectsCommand.COOLDOWN) {
            this.lastRespects.setValue(destination, now);
            return true;
        }

        return false;
    }

    async execute(message: Message): Promise<void> {
        message.channel.send({
            files: ['./img/respects.jpeg']
        });
    }
}
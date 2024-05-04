import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';
import { Dictionary } from 'typescript-collections';

export class DoubtCommand implements ICommand {
    private static COOLDOWN: number = 60 * 60 * 1000;

    name: string = 'doubt';
    description: string = 'X to Doubt';

    private lastDoubts: Dictionary<string, Date> = new Dictionary<string, Date>();

    trigger(message: Message): boolean {
        if (message == null) return false;
        const isX = message.content.stripPunctuation().trim().toLowerCase() == 'x';
        if (!isX) return false;

        const destination = message.channel?.id;
        if (destination == null) return false;

        const now = new Date();
        const lastDoubt = this.lastDoubts.getValue(destination);
        if (lastDoubt == null) {
            this.lastDoubts.setValue(destination, now);
            return true;
        }
        
        if (Math.abs(now.getTime() - lastDoubt.getTime()) > DoubtCommand.COOLDOWN) {
            this.lastDoubts.setValue(destination, now);
            return true;
        }

        return false;
    }

    async execute(message: Message): Promise<void> {
        message.channel.send({
            files: ['./img/doubt.jpg']
        });
    }

}
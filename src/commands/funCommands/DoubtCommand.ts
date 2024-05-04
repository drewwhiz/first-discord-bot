import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';
import { Dictionary } from 'typescript-collections';

export class DoubtCommand implements ICommand {
    private static COOLDOWN: number = 60 * 60 * 1000;

    name: string = 'doubt';
    description: string = 'X to Doubt';

    private lastDoubts: Dictionary<string, Date> = new Dictionary<string, Date>();

    trigger(message: Message): boolean {
        if (message != null && message.content === 'X') {
            const now = new Date();
            const destination = message.channel.id;

            if (destination != null) {
                const lastLoss = this.lastDoubts.getValue(destination);
                if (
                    lastLoss == null ||
                    Math.abs(now.getTime() - lastLoss.getTime()) > DoubtCommand.COOLDOWN
                ) {
                    this.lastDoubts.setValue(destination, now);
                    return true;
                }
            }
        }

        return false;
    }

    async execute(message: Message, args: string[]): Promise<void> {
        message.channel.send({
            files: ['./img/doubt.jpg']
        });
    }

}
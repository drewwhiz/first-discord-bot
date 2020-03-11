import { ICommand } from "../ICommand";
import { Message } from "discord.js";
import { Dictionary } from "typescript-collections";

export class RespectsCommand implements ICommand {
    private static COOLDOWN: number = 60 * 60 * 1000;

    name: string = "respect";
    description: string = "Press F to Pay Respects";

    private lastRespects: Dictionary<string, Date> = new Dictionary<string, Date>();

    trigger(message: Message): boolean {
        if (message != null && message.content === "F") {
            const now = new Date();
            const destination = message.channel.id;

            if (destination != null) {
                const lastLoss = this.lastRespects.getValue(destination);
                if (
                    lastLoss == null ||
                    Math.abs(now.getTime() - lastLoss.getTime()) > RespectsCommand.COOLDOWN
                ) {
                    this.lastRespects.setValue(destination, now);
                    return true;
                }
            }
        }

        return false;
    }

    async execute(message: Message, args: string[]): Promise<void> {
        message.channel.send({
            files: ['./img/respects.jpeg']
        });
    }

}
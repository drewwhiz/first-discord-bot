import { GuildBasedChannel, MessageReaction, User } from 'discord.js';
import { IReactionCommand } from './ICommand.js';

export abstract class ReactionCommand implements IReactionCommand {
    public abstract readonly name: string;
    public abstract readonly description: string;
    public abstract readonly isSilly: boolean;

    protected readonly _seriousChannels: GuildBasedChannel[];

    constructor(seriousChannels: GuildBasedChannel[]) {
        this._seriousChannels = seriousChannels ?? [];
    }

    protected reactionTrigger(reaction: MessageReaction): boolean {
        throw new Error('Method not implemented.');
    }

    public trigger(reaction: MessageReaction): boolean {
        const channel = reaction.message.channel as GuildBasedChannel;
        const canBeSilly = channel == null || !this._seriousChannels.includes(channel);
        if (this.isSilly != canBeSilly) return false;
        return this.reactionTrigger(reaction);
    }

    public execute(reaction: MessageReaction, user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
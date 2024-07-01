import { Message, MessageReaction } from 'discord.js';

export interface IMessageCommand {
  readonly name: string;
  readonly description: string;

  trigger(message: Message): boolean;
  execute(message: Message): Promise<void>;
}

export interface IReactionCommand {
  readonly name: string;
  readonly description: string;

  trigger(reaction: MessageReaction): boolean;
  execute(reaction: MessageReaction): Promise<void>;
}

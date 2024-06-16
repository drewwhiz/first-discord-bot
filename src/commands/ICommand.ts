import { Message } from 'discord.js';

export interface ICommand {
  readonly name: string;
  readonly description: string;

  trigger(message: Message): boolean;
  execute(message: Message): Promise<void>;
}

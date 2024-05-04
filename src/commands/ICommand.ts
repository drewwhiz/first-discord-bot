import { Message } from 'discord.js';

export interface ICommand {
  name: string;
  description: string;

  trigger(message: Message): boolean;
  execute(message: Message): Promise<void>;
}

import { Message } from 'discord.js';

export interface IReminderScheduleService {
  handleReminder(message: Message, reminder: string, deadline: Date): Promise<void>;
}
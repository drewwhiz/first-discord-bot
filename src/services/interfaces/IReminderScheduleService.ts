import { ChatInputCommandInteraction } from 'discord.js';

export interface IReminderScheduleService {
  handleReminder(message: ChatInputCommandInteraction, reminder: string, deadline: Date): Promise<void>;
}
import { ChatInputCommandInteraction, Client, TextChannel } from 'discord.js';
import { IReminderDataService } from '../dataservices/interfaces/IReminderDataService.js';
import { IReminderScheduleService } from './interfaces/IReminderScheduleService.js';
import { scheduleJob } from 'node-schedule';
import { IReminder } from '../models/IReminder.js';

export class ReminderScheduleService implements IReminderScheduleService {
  private readonly _reminders: IReminderDataService;

  public constructor(reminders: IReminderDataService, client: Client<true>) {
    this._reminders = reminders;
    this.loadStoredReminders(client);
  }

  private async loadStoredReminders(client: Client<true>): Promise<void> {
    const reminders = await this._reminders.getAll();
    if (reminders == null || reminders.length == 0) return;

    for (let i = 0; i < reminders.length; i++) {
      await this.handleLoadReminder(client, reminders[i]);
    }
  }

  private async handleLoadReminder(client: Client<true>, reminder: IReminder): Promise<void> {
    if (reminder == null) return;

    if (client == null) {
      await this._reminders.delete(reminder.id);  
      return;  
    }  

    if (reminder.user_id == null || reminder.user_id.length == 0) {
      await this._reminders.delete(reminder.id);
      return;
    }
    
    const deadline = new Date(reminder.deadline);
    if (deadline < new Date()) {
      await ReminderScheduleService.sendReminder(client, reminder.reminder, reminder.user_id, reminder.channel_id, true);
      await this._reminders.delete(reminder.id);
      return;
    }

    scheduleJob(deadline, async () => {
      await ReminderScheduleService.sendReminder(client, reminder.reminder, reminder.user_id, reminder.channel_id);
      await this._reminders.delete(reminder.id);
    });
  }

  public async handleReminder(interaction: ChatInputCommandInteraction, reminder: string, deadline: Date): Promise<void> {
    const client = interaction.client;
    if (client == null) {
      await interaction.reply('Unable to schedule reminder.');
      return;
    };

    if (interaction.channelId == null || interaction.channelId.length == 0) {
      await interaction.reply('Unable to schedule reminder.');
      return;
    }

    const reminderMessage = `<@!${interaction.user.id}> REMINDER: ${reminder}`;
    if (reminderMessage.length > 1990) {
      await interaction.reply('Reminder is too long. Please edit and try again.');
      return;
    }

    const createdReminder = await this._reminders.add({
      id: 0,
      user_id: interaction.user.id,
      channel_id: interaction.channelId,
      deadline: deadline,
      reminder: reminderMessage
    });

    const time = new Date(createdReminder.deadline);
    scheduleJob(time, async () => {
      await ReminderScheduleService.sendReminder(interaction.client, reminderMessage, createdReminder.user_id, createdReminder.channel_id);
      await this._reminders.delete(createdReminder.id);
    });

    if (interaction != null) await interaction.reply('Got it, boss!');
  }

  private static async sendReminder(client: Client<true>, reminder: string, user_id: string, channel_id: string, isLate: boolean = false): Promise<void> {
    const channel = await client.channels.fetch(channel_id);
    if (channel == null) {
      const user = await client.users.fetch(user_id);
      if (user == null) return;
      await user.send(reminder);
      return;
    };

    const textChannel = channel as TextChannel;
    if (textChannel == null) {
      const user = await client.users.fetch(user_id);
      if (user == null) return;
      await user.send(reminder);
      return;
    };

    const message = await textChannel.send(reminder);
    if (isLate) {
      await message.reply('This reminder was delayed. Sorry for the inconvenience.');
    }
  }
}
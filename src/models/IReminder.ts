export interface IReminder {
    id: number;
    user_id: string;
    channel_id: string;
    deadline: Date;
    reminder: string;
}
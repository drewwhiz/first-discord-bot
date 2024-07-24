import { ChannelType, GuildTextBasedChannel, Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { IWordCloudWebService } from '../../webservices/interfaces/IWordCloudWebService.js';

export class AnalyzeCommand implements IMessageCommand {
  private static readonly MAX_MESSAGES: number = 1000;
  private static readonly MAX_WORDS: number = 100;
  public readonly name: string = 'analyze';
  public readonly description: string = 'generates a word cloud';

  private readonly _wordCloud: IWordCloudWebService;

  public constructor(wordCloud: IWordCloudWebService) {
    this._wordCloud = wordCloud;
  }

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.startsWith('analyze') || invariant.startsWith('read');
  }

  public async execute(message: Message): Promise<void> {
    const users = message.mentions.users.map(u => u);
    if (users.length === 0) return;

    const channels = message.mentions.channels.map(c => c).filter(c => c.type == ChannelType.GuildText).map(c => c as GuildTextBasedChannel);
    if (channels.length === 0 && message.channel.type === ChannelType.GuildText) {
      channels.push(message.channel);
    }

    if (channels.length === 0) return;

    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < channels.length; j++) {
        const user = users[i];
        const channel = channels[j];
        if (user.bot) continue;
        const reply = await message.reply(`Please hold... Analyzing last ${AnalyzeCommand.MAX_MESSAGES} messages in <#${channel.id}> from <@!${user.id}> to determine their ${AnalyzeCommand.MAX_WORDS} most-used words.`);
        const messageText = await this.fetchUserMessages(channel, user.id);
        const result = await this._wordCloud.getWordCloud(messageText);
        if (result == null) {
          await reply.reply('Sorry, I was unable to generate the word cloud.');
          continue;
        }

        await reply.reply({
          files: [
            {
              attachment: result
            }
          ]
        });
      }
    }
  }

  private async fetchUserMessages(channel: GuildTextBasedChannel, userId: string): Promise<string> {
    if (channel.type !== ChannelType.GuildText) return null;
    let words: string[] = [];
    let messageCount = 0;
    const messagesToFetch = AnalyzeCommand.MAX_MESSAGES;

    let lastMessageId = null;

    while (messageCount < messagesToFetch) {
      const options = lastMessageId === null
        ? { limit: 100 }
        : { limit: 100, before: lastMessageId };

      const thisFetch = (await channel.messages.fetch(options)).map(m => m);
      if (thisFetch.length === 0) break;

      const byAuthor = thisFetch.filter(m => m.author.id === userId).map(m => m.content.toLowerCase().stripPunctuation().replace(/[\s]/g, ' ').split(' ').map(w => w.trim()));
      messageCount += byAuthor.length;

      if (byAuthor.length !== 0) {
        const wordsToAdd = byAuthor.reduce((e1, e2) => e1.concat(e2));
        words = words.concat(wordsToAdd);  
      }

      lastMessageId = thisFetch[thisFetch.length - 1].id;
    }

    words = words.filter(w => w.length > 0);
    words = words.filter(w => !(/^\d+$/.test(w)));
    words = words.filter(w => !(/^<\d+>$/.test(w)));

    const counts: object = {};

    for (const word of words) {
      counts[word] = counts[word] ? counts[word] + 1 : 1;
    }

    const frequencies: (string | number)[][] = [];
    for (const [key, value] of Object.entries(counts)) {
      frequencies.push([key, value]);
    }

    const sorted = frequencies.sort((a, b) => (b[1] as number) - (a[1] as number)).slice(0, AnalyzeCommand.MAX_WORDS);
    const minCount = sorted[sorted.length - 1][1] as number;
    const wordsToAdd = [];
    for (let i = 0; i < sorted.length; i++) {
      const count = Math.round((sorted[i][1] as unknown as number) / minCount);
      for (let j = 0; j < count; j++) {
        wordsToAdd.push(sorted[i][0]);
      }
    }

    return wordsToAdd.join(' ');
  }
}

import { ChannelType, Message, TextChannel } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { createCanvas } from 'canvas';

import WordCloud from 'node-wordcloud';
const wordCloud = WordCloud();

export class AnalyzeCommand implements IMessageCommand {
  private static readonly MAX_MESSAGES: number = 1000;
  private static readonly MAX_WORDS: number = 1;
  public readonly name: string = 'analyze';
  public readonly description: string = 'generates a word cloud';

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.startsWith('analyze');
  }

  public async execute(message: Message): Promise<void> {
    const users = message.mentions.users.map(u => u);
    if (users.length === 0) return;
    if (message.channel.type != ChannelType.GuildText) return;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.bot) continue;
      const reply = await message.reply(`Please hold... Analyzing last ${AnalyzeCommand.MAX_MESSAGES} messages in this channel from <@!${user.id}> to determine their ${AnalyzeCommand.MAX_WORDS} most-used words.`);
      const wordFrequencies = await this.fetchUserMessages(message.channel, user.id);
      const canvas = createCanvas(100, 100);

      const wordcloud = wordCloud(canvas, { list: wordFrequencies });
      wordcloud.draw();
      const buffer = canvas.toBuffer();
      await reply.reply({
        files: [
          {
            attachment: buffer
          }
        ]
      });
    }
  }

  private async fetchUserMessages(channel: TextChannel, userId: string): Promise<(string | number)[][]> {
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

      const wordsToAdd = byAuthor.reduce((e1, e2) => e1.concat(e2));
      words = words.concat(wordsToAdd);
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

    const sorted = frequencies.sort((a, b) => (b[1] as number) - (a[1] as number));
    return sorted.slice(0, AnalyzeCommand.MAX_WORDS);
  }
}

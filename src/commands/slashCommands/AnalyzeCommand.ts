import { ChannelType, ChatInputCommandInteraction, GuildTextBasedChannel, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import { IWordCloudWebService } from '../../webservices/interfaces/IWordCloudWebService.js';
import SlashCommand from '../SlashCommand.js';

export default class AnalyzeCommand extends SlashCommand {
  private static readonly _USER: string = 'user';
  private static readonly MAX_MESSAGES: number = 1000;
  private static readonly MAX_WORDS: number = 100;
  private readonly _wordCloud: IWordCloudWebService;

  public constructor(wordCloud: IWordCloudWebService) {
    super('read', 'Create a word cloud analyzing the user in the channel');
    this._wordCloud = wordCloud;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {    
    return (await super.build())
      .addUserOption(option => 
        option
          .setName(AnalyzeCommand._USER)
          .setDescription('The user to analyze')
          .setRequired(false)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let user = interaction.options.getUser(AnalyzeCommand._USER);
    if (user == null) user = interaction.user;

    const channel = interaction.channel;
    if (user.bot) return;
    
    await interaction.reply(`Please hold... Analyzing last ${AnalyzeCommand.MAX_MESSAGES} messages in <#${channel.id}> from <@!${user.id}> to determine their ${AnalyzeCommand.MAX_WORDS} most-used words.`);
    const messageText = await AnalyzeCommand.fetchUserMessages(channel, user.id);
    const result = await this._wordCloud.getWordCloud(messageText);

    if (result == null) {
      await interaction.followUp('Sorry, I was unable to generate the word cloud.');
      return;
    }

    await interaction.followUp({
      files: [
        {
          attachment: result
        }
      ]
    });
  }

  private static async fetchUserMessages(channel: GuildTextBasedChannel, userId: string): Promise<string> {
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
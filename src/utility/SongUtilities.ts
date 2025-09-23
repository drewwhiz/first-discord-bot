import { TextChannel } from 'discord.js';

export class SongUtilities {
  private static delay(lengthMilliseconds: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, lengthMilliseconds));
  }

  public static async doYouRemember(
    musicChannels: TextChannel[]
  ): Promise<void> {
    if (musicChannels == null || musicChannels.length == 0) return;

    const remainder =
      'Our hearts were ringin\' In the key that our souls were singin\' As we danced in the night, remember How the stars stole the night away, oh, yeah Hey, hey, hey Ba-dee-ya, say, do you remember? Ba-dee-ya, dancin\' in September Ba-dee-ya, never was a cloudy day Ba-du-da, ba-du-da, ba-du-da, ba-du Ba-du-da, ba-du, ba-du-da, ba-du Ba-du-da, ba-du, ba-du-da My thoughts are with you Holdin\' hands with your heart to see you Only blue talk and love, remember How we knew love was here to stay Now December Found the love that we shared in September Only blue talk and love, remember The true love we share today Hey, hey, hey Ba-dee-ya, say, do you remember? Ba-dee-ya, dancin\' in September Ba-dee-ya, never was a cloudy day There was a Ba-dee-ya (dee-ya, dee-ya), say, do you remember? Ba-dee-ya (dee-ya, dee-ya), dancin\' in September Ba-dee-ya (dee-ya, dee-ya), golden dreams were shiny days The bell was ringin\', oh, oh Our souls were singin\' Do you remember never a cloudy day? Yow There was a Ba-dee-ya (dee-ya, dee-ya), say, do you remember? Ba-dee-ya (dee-ya, dee-ya), dancin\' in September Ba-dee-ya (dee-ya, dee-ya), never was a cloudy day And we\'ll say Ba-dee-ya (dee-ya, dee-ya), say, do you remember? Ba-dee-ya (dee-ya, dee-ya), dancin\' in September Ba-dee-ya (dee ya, dee-ya), golden dreams were shiny days Ba-dee-ya, dee-ya, dee-ya Ba-dee-ya, dee-ya, dee-ya Ba-dee-ya, dee-ya, dee-ya, dee-ya! Ba-dee-ya, dee-ya, dee-ya Ba-dee-ya, dee-ya, dee-ya Ba-dee-ya, dee-ya, dee-ya, dee-ya!';

    const words = remainder.split(' ');
    musicChannels.forEach(async (musicChannel) => {
      let message = await musicChannel.send('Do you remember');
      await this.delay(10000);
      message = await message.reply('The 21st night of September?');
      await this.delay(7000);
      message = await message.reply(
        'Love was changin\' the minds of pretenders'
      );
      await this.delay(4000);
      message = await message.reply('While chasin\' the clouds away');
      await this.delay(4000);

      words.forEach(async (word) => {
        message = await message.reply(word);
        await this.delay(2000);
      });
    });
  }
}

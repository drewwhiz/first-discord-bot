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
      await this.delay(15000);
      message = await message.reply('The 21st night of September?');
      await this.delay(10000);
      message = await message.reply(
        'Love was changin\' the minds of pretenders'
      );
      await this.delay(7000);
      message = await message.reply('While chasin\' the clouds away');
      await this.delay(4000);

      words.forEach(async (word) => {
        message = await message.reply(word);
        await this.delay(3000);
      });
    });
  }

  public static async wakeMeUp(musicChannels: TextChannel[]): Promise<void> {
    if (musicChannels == null || musicChannels.length == 0) return;

    const remainder = 'Like my father\'s come to pass Seven years has gone so fast Wake me up when September ends Here comes the rain again Falling from the stars Drenched in my pain again Becoming who we are As my memory rests But never forgets what I lost Wake me up when September ends Summer has come and passed The innocent can never last Wake me up when September ends Ring out the bells again Like we did when spring began Wake me up when September ends Here comes the rain again Falling from the stars Drenched in my pain again Becoming who we are As my memory rests But never forgets what I lost Wake me up when September ends Summer has come and passed The innocent can never last Wake me up when September ends Like my father\'s come to pass 20 years has gone so fast Wake me up when September ends Wake me up when September ends Wake me up when September ends';

    const words = remainder.split(' ');
    musicChannels.forEach(async (musicChannel) => {
      let message = await musicChannel.send('Sum-mer');
      await this.delay(15000);
      message = await message.reply('Has come and passed');
      await this.delay(10000);
      message = await message.reply('The innocent can never last');
      await this.delay(7000);
      message = await message.reply('Wake me up');
      await this.delay(5000);
      message = await message.reply('When September ends');
      await this.delay(5000);

      words.forEach(async (word) => {
        message = await message.reply(word);
        await this.delay(3000);
      });
    });
  }
}

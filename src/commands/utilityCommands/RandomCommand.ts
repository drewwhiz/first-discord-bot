import { GuildBasedChannel, Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { RandomRollCase } from '../../enum/RandomRollCase.js';
import { IRandomNumberService } from '../../services/interfaces/IRandomNumberService.js';
import winston from 'winston';
import { MessageCommand } from '../MessageCommand.js';

const { debug } = winston;

export class RandomCommand extends MessageCommand {
  public override isSilly: boolean = false;
  private static readonly FLIP_COUNT_REGEX = /^flip [1-9][0-9]*$/;
  private static readonly ROLL_COUNT_REGEX = /^roll [1-9][0-9]*(\s[1-9][0-9]*)?$/;
  // TODO: dice private static readonly ROLL_DICE_REGEX = /^roll d(2|4|6|8|10|12|20|100)(\s[1-9][0-9]*)?$/;

  public readonly name: string = 'random';
  public readonly description: string = 'Sends some generated random number data.';
  private readonly _random: IRandomNumberService;

  public constructor(random: IRandomNumberService, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._random = random;
  }

  private getRollType(content: string): RandomRollCase {
    let invariant = content.toLowerCase().trim();
    if (invariant.startsWith('/')) invariant = invariant.substring(1);
    if (invariant == 'flip') return RandomRollCase.SIMPLE_FLIP;
    if (invariant == 'roll') return RandomRollCase.SIMPLE_ROLL;
    if (RandomCommand.FLIP_COUNT_REGEX.test(invariant)) return RandomRollCase.COUNT_FLIP;
    if (RandomCommand.ROLL_COUNT_REGEX.test(invariant)) return RandomRollCase.COUNT_ROLL;
    // TODO: dice if (RandomCommand.ROLL_DICE_REGEX.test(invariant)) return RandomRollCase.DICE_ROLL;
    return null;
  }

  public override messageTrigger(message: Message): boolean {
    if (message == null) return false;
    if (message.content == null) return false;
    return this.getRollType(message.content) != null;
  }

  public override async execute(message: Message): Promise<void> {
    const rollType = this.getRollType(message.content);
    if (rollType == null) return;

    switch (rollType) {
      case RandomRollCase.SIMPLE_FLIP:
        await this.simpleFlipReply(message);
        break;
      case RandomRollCase.SIMPLE_ROLL:
        await this.simpleRollReply(message);
        break;
      case RandomRollCase.COUNT_FLIP:
        await this.countFlipReply(message);
        break;
      case RandomRollCase.COUNT_ROLL:
        await this.countRollReply(message);
        break;
      case RandomRollCase.DICE_ROLL:
        // TODO: dice roll.
        break;
    }
  }

  private async simpleRollReply(message: Message): Promise<void> {
    const value = this._random.getSimpleRoll();
    await message.reply(`I got ${value}. Do with that information what you will.`);
  }

  private async singleRollReply(message: Message, max: number): Promise<void> {
    if (max == 1) {
      await this.simpleRollReply(message);
      return;
    }

    if (max < 1) return;
    if (max == 2) {
      const newReply = await message.reply('I see what you\'re trying to do...');
      await this.simpleFlipReply(newReply);
      return;
    }

    const value = this._random.getSingleRoll(max);
    await message.reply(`Between 1 and ${max}, I got ${value}! (Not factorial...)`);
  }

  private async simpleFlipReply(message: Message): Promise<void> {
    const isHeads = this._random.isHeads();
    await message.reply(`I got ${isHeads ? 'heads' : 'tails'}!`);
  }

  private async countRollReply(message: Message): Promise<void> {
    const args = message.content
      .toLowerCase().replace('roll', '').trim()
      .split(' ');

    if (args.length > 2) return;

    if (args.length == 1) {
      try {
        await this.singleRollReply(message, parseInt(args[0]));
      } finally {
        debug(`RandomCommand unable to parse args on a count roll: ${args}`);
      }

      return;
    }

    try {
      await this.multipleRollReply(message, parseInt(args[0]), parseInt(args[1]));
    } finally {
      debug(`Unable to parse ${args[0]} or ${args[1]}.`);
    }
  }

  private async multipleRollReply(message: Message, max: number, count: number): Promise<void> {
    if (count < 1) return;
    if (max < 1) return;
    if (count == 1) {
      await this.singleRollReply(message, max);
      return;
    }

    if (max == 2) {
      const newReply = await message.reply('Why do it the hard way?');
      await this.runFlipsReply(newReply, count);
      return;
    }

    const rolls = this._random.getMultipleRolls(max, count);

    const maxValue = Math.max(...rolls);
    const minValue = Math.min(...rolls);
    const total = rolls.reduce((partialSum, a) => partialSum + a, 0);
    const average = total / count;
    const standardDeviation = Math.sqrt(rolls.reduce((partialSum, a) => partialSum + Math.pow(a - average, 2), 0) / (count - 1));

    const reply = `I rolled from 1 to ${max} a total of ${count} times - here's what I got!`
      + `\n- Maximum: ${maxValue}`
      + `\n- Minimum: ${minValue}`
      + `\n- Sum: ${total}`
      + `\n- Average: ${average}`
      + `\n- Standard Deviation: ${standardDeviation}`;

    await message.reply(reply);
  }

  private async runFlipsReply(message: Message, count: number): Promise<void> {
    if (count == 1) {
      await this.simpleFlipReply(message);
      return;
    }

    let heads = 0;
    for (let i = 0; i < count; i++) {
      if (this._random.isHeads()) heads++;
    }

    const tails = count - heads;
    await message.reply(`I got ${heads} heads and ${tails} tails! (And none on their side... again.)`);
  }

  private async countFlipReply(message: Message): Promise<void> {
    const content = message.content.toLowerCase().replace('flip', '').trim();
    let count = 0;
    try {
      count = parseInt(content, 10);
    } catch {
      return;
    }

    if (count < 1) return;
    await this.runFlipsReply(message, count);
  }
}

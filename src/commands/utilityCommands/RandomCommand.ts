import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { RandomRollCase } from '../../enum/RandomRollCase.js';
import winston from 'winston';

const { debug } = winston;

export class RandomCommand implements ICommand {
  private static readonly FLIP_COUNT_REGEX = /^flip [1-9][0-9]*$/;
  private static readonly ROLL_COUNT_REGEX = /^roll [1-9][0-9]*(\s[1-9][0-9]*)?$/;
  // TODO: dice private static readonly ROLL_DICE_REGEX = /^roll d(2|4|6|8|10|12|20|100)(\s[1-9][0-9]*)?$/;

  public name: string = 'random';
  public description: string = 'Sends some generated random number data.';

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

  public trigger(message: Message): boolean {
    if (message == null) return false;
    if (message.content == null) return false;
    return this.getRollType(message.content) != null;
  }

  public async execute(message: Message): Promise<void> {
    const rollType = this.getRollType(message.content);
    if (rollType == null) return;

    switch (rollType) {
      case RandomRollCase.SIMPLE_FLIP:
        await this.simpleFlip(message);
        break;
      case RandomRollCase.SIMPLE_ROLL:
        await this.simpleRoll(message);
        break;
      case RandomRollCase.COUNT_FLIP:
        await this.countFlip(message);
        break;
      case RandomRollCase.COUNT_ROLL:
        await this.countRoll(message);
        break;
      case RandomRollCase.DICE_ROLL:
        // TODO: dice roll.
        break;
    }
  }

  private async simpleRoll(message: Message): Promise<void> {
    const value = Math.random();
    await message.reply(`I got ${value}. Do with that information what you will.`);
  }

  private async simpleFlip(message: Message): Promise<void> {
    const isHeads = Math.random() >= 0.5;
    await message.reply(`I got ${isHeads ? 'heads' : 'tails'}!`)
  }

  private async countFlip(message: Message): Promise<void> {
    const content = message.content.toLowerCase().replace('flip', '').trim();
    let count = 0;
    try {
      count = parseInt(content, 10);
    } catch {
      return;
    }

    if (count < 1) return;
    if (count == 1) {
      await this.simpleFlip(message);
      return;
    }

    let heads = 0;
    for (let i = 0; i < count ; i++) {
      if (Math.random() >= 0.5) heads++;
    }

    const tails = count - heads;
    await message.reply(`I got ${heads} heads and ${tails} tails! (And none on their side... again.)`);
  }

  private async singleRoll(message: Message, max: number): Promise<void> {
    if (max == 1) {
      await this.simpleRoll(message);
      return;
    }

    if (max < 1) return;

    const value = 1 + Math.floor(max * Math.random());
    await message.reply(`Between 1 and ${max}, I got ${value}! (Not factorial...)`);
  }

  private async multipleRoll(message: Message, max: number, count: number): Promise<void> {
    if (count < 1) return;
    if (max < 1) return;
    if (count == 1) {
      await this.singleRoll(message, max);
      return;
    }

    const rolls = [];
    for (let i = 0; i < count ; i++) {
      rolls.push(1 + Math.floor(max * Math.random()));
    }

    const maxValue = Math.max(...rolls);
    const minValue = Math.min(...rolls);
    const total = rolls.reduce((partialSum, a) => partialSum + a, 0);
    const average = total / count;
    const standardDeviation = Math.sqrt(rolls.reduce((partialSum, a) => partialSum + Math.pow(a  - average, 2), 0) / (count - 1));

    const reply = `I rolled from 1 to ${max} a total of ${count} times - here's what I got!`
      + `\n- Maximum: ${maxValue}`
      + `\n- Minimum: ${minValue}`
      + `\n- Sum: ${total}`
      + `\n- Average: ${average}`
      + `\n- Standard Deviation: ${standardDeviation}`;

    await message.reply(reply);
  }

  private async countRoll(message: Message): Promise<void> {
    const args = message.content
      .toLowerCase().replace('roll', '').trim()
      .split(' ');

    if (args.length > 2) return;

    if (args.length == 1) {
      try {
        await this.singleRoll(message, parseInt(args[0]));
      } finally {
        debug(`RandomCommand unable to parse args on a count roll: ${args}`);
      }

      return;
    }

    try {
      await this.multipleRoll(message, parseInt(args[0]), parseInt(args[1]));
    } finally {
      debug(`Unable to parse ${args[0]} or ${args[1]}.`);
    }
  }
}

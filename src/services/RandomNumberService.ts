import { Message } from 'discord.js';
import { IRandomNumberService } from './interfaces/IRandomNumberService.js';
import winston from 'winston';

const { debug } = winston;

export class RandomNumberService implements IRandomNumberService {

  async simpleRollReply(message: Message): Promise<void> {
    const value = Math.random();
    await message.reply(`I got ${value}. Do with that information what you will.`);
  }

  async simpleFlipReply(message: Message): Promise<void> {
    const isHeads = Math.random() >= 0.5;
    await message.reply(`I got ${isHeads ? 'heads' : 'tails'}!`);
  }

  async countFlipReply(message: Message): Promise<void> {
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

  async runFlipsReply(message: Message, count: number): Promise<void> {
    if (count == 1) {
      await this.simpleFlipReply(message);
      return;
    }

    let heads = 0;
    for (let i = 0; i < count; i++) {
      if (Math.random() >= 0.5) heads++;
    }

    const tails = count - heads;
    await message.reply(`I got ${heads} heads and ${tails} tails! (And none on their side... again.)`);
  }

  getSingleRoll(max: number): number {
    if (max < 1) return max;
    if (!Number.isInteger(max)) return max;
    return 1 + Math.floor(max * Math.random());
  }

  async singleRollReply(message: Message, max: number): Promise<void> {
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

    const value = this.getSingleRoll(max);
    await message.reply(`Between 1 and ${max}, I got ${value}! (Not factorial...)`);
  }

  async multipleRollReply(message: Message, max: number, count: number): Promise<void> {
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

    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(1 + Math.floor(max * Math.random()));
    }

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

  async countRollReply(message: Message): Promise<void> {
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
}
import { IRandomNumberService } from './interfaces/IRandomNumberService.js';

export class RandomNumberService implements IRandomNumberService {
  public getMultipleRolls(max: number, count: number): number[] {
    if (max < 1) return [];
    if (count < 1) return [];
    if (!Number.isInteger(max)) return [];
    if (!Number.isInteger(count)) return [];

    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(this.getSingleRoll(max));
    }

    return rolls;
  }

  public isHeads(): boolean {
    return Math.random() >= 0.5;
  }

  public getSingleRoll(max: number): number {
    if (max < 1) return max;
    if (!Number.isInteger(max)) return max;
    return 1 + Math.floor(max * Math.random());
  }

  public getSimpleRoll(): number {
    return Math.random();
  }
}
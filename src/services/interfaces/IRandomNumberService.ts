export interface IRandomNumberService {    
    getSingleRoll(max: number): number;
    getMultipleRolls(max: number, count: number): number[];
    getSimpleRoll(): number;
    isHeads(): boolean;
}
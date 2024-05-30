import { Message } from 'discord.js';
import { expect } from 'chai';
import { AcronymHelperCommand } from '../../../src/commands/utilityCommands/AcronymHelperCommand.js';

describe('Acronym Helper Command', () => {
    it('should trigger on frc?', () => {
        const content = 'frc?';
        const message = Message.prototype;
        message.content = content;
        const command = new AcronymHelperCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on frc', () => {
        const content = 'frc';
        const message = Message.prototype;
        message.content = content;
        const command = new AcronymHelperCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should trigger on FIRST', () => {
        const content = 'FIRST?';
        const message = Message.prototype;
        message.content = content;
        const command = new AcronymHelperCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on first', () => {
        const content = 'first?';
        const message = Message.prototype;
        message.content = content;
        const command = new AcronymHelperCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
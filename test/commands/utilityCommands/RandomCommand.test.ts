import { Message } from 'discord.js';
import { expect } from 'chai';
import { RandomCommand } from '../../../src/commands/utilityCommands/RandomCommand.js';

describe('Random Command', () => {
    it('should trigger on fLip', () => {
        const content = 'fLip';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on /flip', () => {
        const content = '/flip';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on RolL', () => {
        const content = 'RolL';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on flip 4', () => {
        const content = 'flip 4';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on flip a', () => {
        const content = 'flip a';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should trigger on roll 4', () => {
        const content = 'roll 4';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on roll a', () => {
        const content = 'roll a';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on flip 4 5', () => {
        const content = 'flip 4 5';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should trigger on roll 4 5', () => {
        const content = 'roll 4 5';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on roll 4 a', () => {
        const content = 'roll 4 a';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on roll 4 5 6', () => {
        const content = 'roll 4 5 6';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should trigger on roll d4', () => {
        const content = 'roll d4';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should trigger on roll d4 5', () => {
        const content = 'roll d4 5';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on roll d5', () => {
        const content = 'roll d5';
        const message = Message.prototype;
        message.content = content;
        const command = new RandomCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
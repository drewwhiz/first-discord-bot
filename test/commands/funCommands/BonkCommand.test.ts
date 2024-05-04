import { Message } from 'discord.js';
import { expect } from 'chai';
import { BonkCommand } from '../../../src/commands/funCommands/BonkCommand.js';

describe('Bonk Command', () => {
    it('should trigger on \'dual event\'', () => {
        const content = 'dual event';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'double event\'', () => {
        const content = 'double event';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'triple event\'', () => {
        const content = 'triple event';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'quadruple event\'', () => {
        const content = 'quadruple event';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'dual events\'', () => {
        const content = 'dual events';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'double events\'', () => {
        const content = 'double events';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'triple events\'', () => {
        const content = 'triple events';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'quadruple events\'', () => {
        const content = 'quadruple events';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on \'event\'', () => {
        const content = 'event';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on \'events\'', () => {
        const content = 'events';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on \'dual\'', () => {
        const content = 'dual';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on \'double\'', () => {
        const content = 'double';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on \'triple\'', () => {
        const content = 'triple';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on \'quadruple\'', () => {
        const content = 'quadruple';
        const message = Message.prototype;
        message.content = content;
        const command = new BonkCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
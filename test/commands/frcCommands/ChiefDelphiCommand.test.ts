import { Message } from 'discord.js';
import { expect } from 'chai';
import { ChiefDelphiCommand } from '../../../src/commands/frcCommands/ChiefDelphiCommand.js';

describe('Chief Delphi Command', () => {
    it('should trigger on message starting with /cd', () => {
        const content = '/CD pls';
        const message = Message.prototype;
        message.content = content;

        const command = new ChiefDelphiCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on message starting with cd', () => {
        const content = 'Cd pls';
        const message = Message.prototype;
        message.content = content;

        const command = new ChiefDelphiCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on message starting with cd:', () => {
        const content = 'Cd: pls';
        const message = Message.prototype;
        message.content = content;

        const command = new ChiefDelphiCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on message starting with cd:', () => {
        const content = 'Cd:        pls';
        const message = Message.prototype;
        message.content = content;

        const command = new ChiefDelphiCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on message only cd', () => {
        const content = 'Cd:  ';
        const message = Message.prototype;
        message.content = content;

        const command = new ChiefDelphiCommand();
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on message only cd', () => {
        const content = '     Cd:  ';
        const message = Message.prototype;
        message.content = content;

        const command = new ChiefDelphiCommand();
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on message without cd', () => {
        const content = 'c d:  ';
        const message = Message.prototype;
        message.content = content;

        const command = new ChiefDelphiCommand();
        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
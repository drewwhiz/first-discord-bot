import { Message } from 'discord.js';
import { expect } from 'chai';
import { DocumentationCommand } from '../../../src/commands/frcCommands/DocumentationCommand.js';

describe('Documentation Command', () => {
    it('should trigger on message starting with /docs', () => {
        const content = '/docs pls';
        const message = Message.prototype;
        message.content = content;

        const command = new DocumentationCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on message starting with /doc', () => {
        const content = '/doc pls';
        const message = Message.prototype;
        message.content = content;

        const command = new DocumentationCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on message starting with docs', () => {
        const content = 'docs pls';
        const message = Message.prototype;
        message.content = content;

        const command = new DocumentationCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on message starting with doc', () => {
        const content = 'doc pls';
        const message = Message.prototype;
        message.content = content;

        const command = new DocumentationCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on message without doc', () => {
        const content = 'doctor pls';
        const message = Message.prototype;
        message.content = content;

        const command = new DocumentationCommand();
        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
import { Message } from 'discord.js';
import { expect } from 'chai';
import { MainGoalCommand } from '../../../src/commands/funCommands/MainGoalCommand.js';

describe('Main Goal Command', () => {
    it('should trigger on message with goal', () => {
        const content = 'this message has the word GoAl';
        const message = Message.prototype;
        message.content = content;
        
        const command = new MainGoalCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on message with goals', () => {
        const content = 'this message has the word GoAlS';
        const message = Message.prototype;
        message.content = content;
        
        const command = new MainGoalCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on message with goalie', () => {
        const content = 'this message has the word goalie';
        const message = Message.prototype;
        message.content = content;
        
        const command = new MainGoalCommand();
        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});
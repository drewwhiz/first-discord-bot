/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { MainGoalCommand } from '../../../src/commands/funCommands/MainGoalCommand.js';

describe('Main Goal Command', function() {
  it('should trigger on message with goal', function() {
    const content = 'this message has the word GoAl';
    const message = Message.prototype;
    message.content = content;
        
    const command = new MainGoalCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on message with goals', function() {
    const content = 'this message has the word GoAlS';
    const message = Message.prototype;
    message.content = content;
        
    const command = new MainGoalCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on message with goalie', function() {
    const content = 'this message has the word goalie';
    const message = Message.prototype;
    message.content = content;
        
    const command = new MainGoalCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
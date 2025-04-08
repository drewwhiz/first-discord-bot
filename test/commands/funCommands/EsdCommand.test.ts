/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Message } from 'discord.js';
import { expect } from 'chai';
import { EsdCommand } from '../../../src/commands/funCommands/EsdCommand.js';

describe('ESD Command', function() {
  it('should trigger on esd', function() {
    const content = 'I think ESD could occur';
    const message = Message.prototype;
    message.content = content;
    const command = new EsdCommand(null, null);
  
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on electrostatic discharge', function() {
    const content = 'I think electrostatic discharge could occur';
    const message = Message.prototype;
    message.content = content;
    const command = new EsdCommand(null, null);
    
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on electro static discharge', function() {
    const content = 'I think electro static discharge could occur';
    const message = Message.prototype;
    message.content = content;
    const command = new EsdCommand(null, null);
    
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on electro-static discharge', function() {
    const content = 'I think electro-static discharge could occur';
    const message = Message.prototype;
    message.content = content;
    const command = new EsdCommand(null, null);
    
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on electrostaticdischarge', function() {
    const content = 'I think electrostaticdischarge could occur';
    const message = Message.prototype;
    message.content = content;
    const command = new EsdCommand(null, null);
    
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on desde', function() {
    const content = 'I think desde is a spanish word';
    const message = Message.prototype;
    message.content = content;
    const command = new EsdCommand(null, null);
    
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
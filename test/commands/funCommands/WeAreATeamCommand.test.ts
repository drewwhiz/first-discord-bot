import { Message } from 'discord.js';
import { expect } from 'chai';
import { WeAreATeamCommand } from '../../../src/commands/funCommands/WeAreATeamCommand.js';

describe('We Are A Team Command', function() {
  it('should trigger on \'we\'re a team\'', function() {
    const content = 'we\'re a team';
    const message = Message.prototype;
    message.content = content;
    const command = new WeAreATeamCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on \'we are a team\'', function() {
    const content = 'we aRe a teAm';
    const message = Message.prototype;
    message.content = content;
    const command = new WeAreATeamCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it.skip('should trigger on \'🤛\'', function() {
    const content = '🤛';
    const message = Message.prototype;
    message.content = content;
    const command = new WeAreATeamCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it.skip('should trigger on \'🤜\'', function() {
    const content = '🤜';
    const message = Message.prototype;
    message.content = content;
    const command = new WeAreATeamCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it.skip('should trigger on \'👊\'', function() {
    const content = '👊';
    const message = Message.prototype;
    message.content = content;
    const command = new WeAreATeamCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on \'👊👊\'', function() {
    const content = '👊👊';
    const message = Message.prototype;
    message.content = content;
    const command = new WeAreATeamCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on \'we are a team\' and other stuff', function() {
    const content = 'i think that WE ARE A TEAM';
    const message = Message.prototype;
    message.content = content;
    const command = new WeAreATeamCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on empty', function() {
    const content = '';
    const message = Message.prototype;
    message.content = content;
    const command = new WeAreATeamCommand(null);

    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});
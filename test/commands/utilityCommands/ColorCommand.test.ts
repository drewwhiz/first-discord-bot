import { Message } from 'discord.js';
import { expect } from 'chai';
import { ColorCommand } from '../../../src/commands/utilityCommands/ColorCommand.js';

describe('Color Command', function () {
  it('should trigger on valid hex code', function () {
    const content = '#ffffff';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on invalid hex code', function () {
    const content = '#gggggg';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on rgb, parentheses, commas, spaces, values', function () {
    const content = 'rgb(255, 255, 255)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on rgb, parentheses, spaces, values', function () {
    const content = 'rgb(255 255 255)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on rgb, parentheses, commas, values', function () {
    const content = 'rgb(255,255,255)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on rgb, commas, values', function () {
    const content = 'rgb 255,255,255 ';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on rgb, spaces, values', function () {
    const content = 'rgb 255 255 255 ';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on rgb invalid red', function () {
    const content = 'rgb(256, 255, 255)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on rgb invalid green', function () {
    const content = 'rgb(255, 256, 255)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on rgb invalid blue', function () {
    const content = 'rgb(255, 255, 256)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on rgb with alpha', function () {
    const content = 'rgb(255, 255, 255, 1.0)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should trigger on rgba, parentheses, commas, spaces, values', function () {
    const content = 'rgba(255, 255, 255, 1.0)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on rgba, parentheses, spaces, values', function () {
    const content = 'rgba(255 255 255 1.0)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on rgba, parentheses, commas, values', function () {
    const content = 'rgba(255,255,255,1.0)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on rgba, commas, values', function () {
    const content = 'rgba 255,255,255,1.0 ';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should trigger on rgba, spaces, values', function () {
    const content = 'rgba 255 255 255 1.0';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on rgba invalid red', function () {
    const content = 'rgb(256, 255, 255, 1.0)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on rgba invalid green', function () {
    const content = 'rgb(255, 256, 255, 1.0)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on rgba invalid blue', function () {
    const content = 'rgb(255, 255, 256, 1.0)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on rgba invalid alpha', function () {
    const content = 'rgb(255, 255, 255, -1.0)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger on rgba without alpha', function () {
    const content = 'rgba(255, 255, 255)';
    const message = Message.prototype;
    message.content = content;
    const command = new ColorCommand();

    const result = command.trigger(message);
    expect(result).to.be.false;
  });

});
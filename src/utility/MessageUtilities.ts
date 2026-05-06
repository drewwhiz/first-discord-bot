export class MessageUtilities {
  private static readonly _MAX_LENGTH: number = 2000;

  /**
   * Combine multiple lines into one or more messages under the Discord maximum length.
   * @param lines the lines of text to convert into messages
   * @returns the collection of messages to send. if any line is too long, the list will be empty.
   */
  public static generateMessages(lines: string[]): string[] {
    const messages: string[] = [];
    if (lines == null) return messages;

    lines = lines.filter(l => l != null);
    if (lines.length == 0) return messages;

    const hasLongLines = lines.filter(l => l.length >= this._MAX_LENGTH).length > 0;
    if (hasLongLines) return messages;

    let currentMessage = '';
    for (let index = 0; index < lines.length; index++) {
      const currentLength = currentMessage.length;
      const nextLine = currentLength === 0 ? lines[index] : '\n' + lines[index];
      const nextLineLength = nextLine.length;

      if (currentLength + nextLineLength < this._MAX_LENGTH) {
        currentMessage += nextLine;
        continue;
      }

      messages.push(currentMessage);
      currentMessage = lines[index];
    }

    messages.push(currentMessage);
    return messages;
  }
}
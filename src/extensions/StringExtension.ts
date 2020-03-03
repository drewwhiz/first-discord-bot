interface String {
  containsAny: (this: string, ...args: string[]) => boolean;
  isFirstWord: (this: string, startText: string) => boolean;
}

String.prototype.containsAny = function(this: string, ...args: string[]): boolean {
  if (args == null || args.length == 0) return false;
  
  let keywords = [] as string[];
  args.forEach(element => {
    keywords.push(element.toLocaleLowerCase());
  });

  const words = new String(this)
        .toLowerCase()
        .replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(" ");
  
  return words.some(element => keywords.indexOf(element) >= 0);
}

String.prototype.isFirstWord = function(this: string, startText: string): boolean {
  if (startText == null || startText.length == 0) return false;

  const words = new String(this)
        .toLowerCase()
        .replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(" ");

  if (words.length < 1) return false;

  return startText.toLowerCase() == words[0];
}
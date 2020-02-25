interface String {
  containsAny: (this: string, ...args: string[]) => boolean;
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
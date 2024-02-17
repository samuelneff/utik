
const oneWordRegex = /^\w+$/;

export function isOneWord(maybeWord: string) {
  return oneWordRegex.test(maybeWord);
}
import { assertArray } from './assertArray';

export function indent(multilineText: string | string[], count: number): string {

  const lines = typeof multilineText === 'string'
    ? multilineText.split('\n')
    : assertArray(
      multilineText,
      `Expected text to be a string or array of strings but got ${ typeof multilineText }.`
    );

  const indetation = ' '.repeat(count);
  return lines.map(
    line => line.length === 0 ? '' : indetation + line
  ).join('\n');
}

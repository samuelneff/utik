import { defaultTemplateLiteral } from './defaultTemplateLiteral';
import { minIndent } from './minIndent';

export function trimIndent(multilineText: string): string;
export function trimIndent<
  Elem extends string,
  Template extends ReadonlyArray<Elem>,
>(template: Template, ...values: unknown[]): string;

export function trimIndent(strings: string | string[], ...values: unknown[]): string {

  const source = defaultTemplateLiteral(strings, ...values);
  const lines = source.split('\n');
  const indent = minIndent(lines);
  return lines.map(trimIndentLine).join('\n');

  function trimIndentLine(line: string): string {
    return line.startsWith(' ') ? line.substring(indent) : line;
  }
}

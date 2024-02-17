import { assertArray } from './assertArray';
import { lineIndent } from './lineIndent';

/**
 * Return the minimum number of spaces of any line, ignoring the first and
 * last lines if they are not indented.
 *
 * @param text Multi-line string to be split on carriage return or an array
 *             of strings assumed to be one line each.
 */
export function minIndent(text: string | string[]): number {

  if (text === undefined || text === null) {
    return 0;
  }

  const lines = typeof text === 'string'
    ? text.split('\n')
    : assertArray(
      text,
      `minIndent expected a string or array of strings but got ${ typeof text }.`
    );

  // handle special cases where the first/last would not be ignored
  switch (lines.length) {
    case 0:
      return 0;

    case 1:
      return lineIndent(lines[ 0 ]);

    case 2:
      return Math.min(
        lineIndent(lines[ 0 ]),
        lineIndent(lines[ 1 ])
      );
  }

  const minIndentFound = lines.reduce(
    (maybeMinIndent, line, index) => {

      if (line.length === 0) {
        return maybeMinIndent;
      }

      const indent = lineIndent(line);

      // ignore lines that are only whitespace
      if (indent === line.length) {
        return maybeMinIndent;
      }

      return indent !== 0
        ? Math.min(indent, maybeMinIndent)
        : index > 0 && index < lines.length - 1
          ? 0
          : maybeMinIndent;


    },
    Number.MAX_SAFE_INTEGER
  );

  return minIndentFound === Number.MAX_SAFE_INTEGER
    ? 0
    : minIndentFound;
}

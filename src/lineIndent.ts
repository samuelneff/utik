
const initialSpacesPattern = /^ +/;

/**
 * Returns the number of spaces at the beginning of the provided line. Multi-line strings
 * are ignored and only the first line is considered.
 */
export function lineIndent(line: string) {
  return line === undefined || line === null
    ? 0
    : initialSpacesPattern.exec(line)?.[ 0 ].length ?? 0;
}

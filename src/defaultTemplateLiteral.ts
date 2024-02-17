export function defaultTemplateLiteral<
  Elem extends string,
  Template extends ReadonlyArray<Elem>,
  Value extends string,
  Values extends Value[]
>(template: Template, ...values: [ ...Values ]): string;
export function defaultTemplateLiteral(multilineText: string): string;
export function defaultTemplateLiteral(strings: string | string[], ...values: unknown[]): string;
export function defaultTemplateLiteral(strings: string | string[], ...values: unknown[]): string {

  return typeof strings === 'string'
    ? strings
    : strings.length === 1
      ? strings[ 0 ]
      : strings.reduce(
        (combinedText, stringPart, stringIndex) =>
          `${ combinedText }${ stringPart }${ values[ stringIndex ] ?? '' }`,
        ''
      );
}
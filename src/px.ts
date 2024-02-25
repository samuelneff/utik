export function px(maybeLength: number | unknown) {
  return typeof maybeLength === 'number' && !Number.isNaN(maybeLength) && maybeLength !== 0
    ? `${ maybeLength }px`
    : String(maybeLength);
}

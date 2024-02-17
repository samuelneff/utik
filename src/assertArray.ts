export function assertArray<T>(actual: T, message?: string): T {
  if (Array.isArray(actual)) {
    return actual;
  }

  throw new Error(message ?? `Array was expected but found ${ typeof actual }.`);
}

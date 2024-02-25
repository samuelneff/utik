
export function throwError(error: Error): never;
export function throwError(message: string): never;
export function throwError(messageOrError: string | Error): never {
  throw typeof messageOrError === 'string'
    ? new Error(messageOrError)
    : messageOrError;
}

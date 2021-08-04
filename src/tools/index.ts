export function unwrapFunction<P extends unknown[] = []>(
  fn?: (...args: P) => void
): (...args: P) => void {
  return (
    fn ??
    (() => {
      // empty function
    })
  );
}

export function throwNotInitError(): unknown {
  throw new Error("This function is not initialized");
}

// simple toolkit to transfer object to form
// for example:
// { a: 'a', b: 'b' }
// will transferred into
// a=a&b=b
export function obj2form(data: StringMap): string {
  const urlEncodedDataPairs = [];
  for (const name in data) {
    urlEncodedDataPairs.push(
      encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
    );
  }
  return urlEncodedDataPairs.join("&").replace(/%20/g, "+");
}

export function unwrapAccessible<T, P extends unknown[] = []>(
  accessible: Accessible<T, P>,
  ...args: P
): T {
  if (accessible instanceof Function) {
    return accessible(...args);
  } else {
    return accessible;
  }
}

export interface EmptyObject {
  [key: string]: never;
}

export interface StringMap {
  [key: string]: string;
}

// value or a function returns value (with or without parameters)
export type Accessible<T, P extends unknown[] = []> = T | ((...args: P) => T);

export type DefaultFn = () => unknown;

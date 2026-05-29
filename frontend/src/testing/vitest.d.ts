import 'vitest';

interface DomMatchers<R = unknown> {
  toBeEmptyDOMElement: () => R;
  toBeInTheDocument: () => R;
  toHaveAttribute: (attribute: string, value?: string) => R;
  toHaveTextContent: (text: string | RegExp) => R;
}

declare module 'vitest' {
  interface Assertion<T> extends DomMatchers<T> {}
  interface AsymmetricMatchersContaining extends DomMatchers {}
}

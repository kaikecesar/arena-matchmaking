// Libraries
import { expect } from 'vitest';

type MatcherResult = { message: () => string; pass: boolean };

const isElement = (value: unknown): value is Element =>
  value instanceof Element;

const isInDocument = (element: Element | null): boolean =>
  element !== null && (element.ownerDocument?.body.contains(element) ?? false);

const isEmptyDomElement = (element: HTMLElement): boolean => {
  const { childNodes } = element;

  if (childNodes.length === 0) {
    return true;
  }

  if (childNodes.length === 1 && childNodes[0]?.nodeType === Node.TEXT_NODE) {
    return !/\S/.test(element.textContent ?? '');
  }

  return false;
};

const formatValue = (value: unknown): string =>
  typeof value === 'string' ? `"${value}"` : String(value);

const toBeInTheDocument = (received: unknown): MatcherResult => {
  const pass = isElement(received) && isInDocument(received);

  return {
    pass,
    message: (): string =>
      pass
        ? `expected element not to be in the document`
        : `expected ${formatValue(received)} to be in the document`,
  };
};

const toBeEmptyDOMElement = (received: unknown): MatcherResult => {
  const pass = received instanceof HTMLElement && isEmptyDomElement(received);

  return {
    pass,
    message: (): string =>
      pass
        ? `expected element not to be empty`
        : `expected element to be empty`,
  };
};

const toHaveTextContent = (
  received: unknown,
  expected: string | RegExp,
): MatcherResult => {
  const text = isElement(received) ? (received.textContent ?? '') : '';
  const pass =
    typeof expected === 'string'
      ? text === expected
      : expected.test(text);

  return {
    pass,
    message: (): string => {
      if (pass) {
        return `expected element not to have text content ${formatValue(expected)}`;
      }

      return (
        `expected element to have text content ${formatValue(expected)}, ` +
        `got ${formatValue(text)}`
      );
    },
  };
};

const toHaveAttribute = (
  received: unknown,
  attribute: string,
  expectedValue?: string,
): MatcherResult => {
  if (!isElement(received)) {
    return {
      pass: false,
      message: (): string => `expected an element to have attribute "${attribute}"`,
    };
  }

  const hasAttribute = received.hasAttribute(attribute);
  const actualValue = received.getAttribute(attribute);
  const pass =
    expectedValue === undefined
      ? hasAttribute
      : hasAttribute && actualValue === expectedValue;

  return {
    pass,
    message: (): string => {
      if (expectedValue === undefined) {
        return pass
          ? `expected element not to have attribute "${attribute}"`
          : `expected element to have attribute "${attribute}"`;
      }

      if (pass) {
        return `expected element not to have attribute "${attribute}"="${expectedValue}"`;
      }

      return (
        `expected element to have attribute "${attribute}"="${expectedValue}", ` +
        `got "${actualValue}"`
      );
    },
  };
};

export const registerDomMatchers = (): void => {
  expect.extend({
    toBeInTheDocument,
    toBeEmptyDOMElement,
    toHaveTextContent,
    toHaveAttribute,
  });
};

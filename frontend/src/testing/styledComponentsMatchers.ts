// Node
import { createRequire } from 'node:module';

// Libraries
import { expect } from 'vitest';

type VitestSnapshotSerializer = Parameters<typeof expect.addSnapshotSerializer>[0];

interface StyleSheetSerializerPlugin {
  serialize: (
    val: unknown,
    config: unknown,
    indentation: string,
    depth: number,
    refs: unknown[],
    printer: (val: unknown, ...args: unknown[]) => string,
  ) => string;
  test: (val: unknown) => boolean;
}

type ToHaveStyleRuleMatcher = (
  this: unknown,
  property: string,
  value?: string | RegExp,
  options?: Record<string, string>,
) => { message: () => string; pass: boolean };

const nodeRequire = createRequire(import.meta.url);

const rawStyleSheetSerializer = nodeRequire(
  'jest-styled-components/src/styleSheetSerializer.js',
) as StyleSheetSerializerPlugin;

const { resetStyleSheet } = nodeRequire('jest-styled-components/src/utils.js') as {
  resetStyleSheet: () => void;
};

const rawToHaveStyleRule = nodeRequire(
  'jest-styled-components/src/toHaveStyleRule.js',
) as ToHaveStyleRuleMatcher;

const styleSheetSerializer =
  rawStyleSheetSerializer as unknown as VitestSnapshotSerializer;

const toHaveStyleRule = rawToHaveStyleRule;

export const registerStyledComponentsMatchers = (): void => {
  expect.addSnapshotSerializer(styleSheetSerializer);
  expect.extend({ toHaveStyleRule });
};

export { resetStyleSheet };

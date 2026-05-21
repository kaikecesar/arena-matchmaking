export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

export const isLoginApiError = (value: unknown): value is { error: string } => {
  return isObject(value) && typeof value.error === 'string';
};

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) {
    return false;
  }
  if (/^(\d)\1+$/.test(digits)) {
    return false;
  }

  const calcVerifier = (slice: string, startFactor: number): number => {
    let sum = 0;
    let factor = startFactor;
    for (const d of slice) {
      sum += parseInt(d, 10) * factor;
      factor--;
    }
    const rem = sum % 11;
    return rem < 2
      ? 0
      : 11 - rem;
  };

  const v1 = calcVerifier(digits.slice(0, 9), 10);
  const v2 = calcVerifier(digits.slice(0, 10), 11);

  const ninth = digits[9];
  const tenth = digits[10];
  if (ninth === undefined || tenth === undefined) {
    return false;
  }

  return parseInt(ninth, 10) === v1 && parseInt(tenth, 10) === v2;
};

export { isValidEmail, isValidCPF };

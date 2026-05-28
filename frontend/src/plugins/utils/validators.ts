/* *************************************************************************************************
****************************************** DOCUMENT DIGITS *****************************************
************************************************************************************************* */
const onlyDigits = (value: string): string => value.replace(/\D/g, '');

const isValidCPF = (cpf: string): boolean => {
  const digits = onlyDigits(cpf);
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

const isValidCNPJ = (cnpj: string): boolean => {
  const digits = onlyDigits(cnpj);
  if (digits.length !== 14) {
    return false;
  }
  if (/^(\d)\1+$/.test(digits)) {
    return false;
  }

  const calcVerifier = (slice: string, weights: readonly number[]): number => {
    let sum = 0;
    for (let index = 0; index < slice.length; index++) {
      const digit = slice[index];
      const weight = weights[index];
      if (digit === undefined || weight === undefined) {
        return -1;
      }
      sum += parseInt(digit, 10) * weight;
    }
    const rem = sum % 11;
    return rem < 2
      ? 0
      : 11 - rem;
  };

  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const;
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const;

  const v1 = calcVerifier(digits.slice(0, 12), firstWeights);
  const v2 = calcVerifier(digits.slice(0, 13), secondWeights);

  const twelfth = digits[12];
  const thirteenth = digits[13];
  if (twelfth === undefined || thirteenth === undefined) {
    return false;
  }

  return parseInt(twelfth, 10) === v1 && parseInt(thirteenth, 10) === v2;
};

export { isValidCNPJ, isValidCPF, onlyDigits };

// Libraries
import { z } from 'zod';

// Plugins
import { isValidCNPJ, isValidCPF, onlyDigits } from '@/plugins/utils/validators';

// Types
import { CpfCnpjStringMessages } from './documents.types';

/* *************************************************************************************************
*************************************** CPF / CNPJ FIELD BUILDER ***********************************
************************************************************************************************* */
const cpfCnpjString = (messages: CpfCnpjStringMessages): z.ZodString =>
  z
    .string()
    .min(1, { message: messages.required })
    .refine(
      (doc) => onlyDigits(doc).length >= 11,
      { message: messages.minLength }
    )
    .refine(
      (doc) => onlyDigits(doc).length <= 14,
      { message: messages.maxLength }
    )
    .refine(
      (doc) => {
        const digits = onlyDigits(doc);
        return digits.length > 0 && Number(digits) !== 0;
      },
      { message: messages.numericOnly }
    )
    .refine(
      (doc) => {
        const length = onlyDigits(doc).length;
        return length === 11 || length === 14;
      },
      { message: messages.invalidLength }
    )
    .refine(
      (doc) => {
        const digits = onlyDigits(doc);
        return digits.length !== 11 || isValidCPF(doc);
      },
      { message: messages.invalidCpf }
    )
    .refine(
      (doc) => {
        const digits = onlyDigits(doc);
        return digits.length !== 14 || isValidCNPJ(doc);
      },
      { message: messages.invalidCnpj }
    );

export { cpfCnpjString };

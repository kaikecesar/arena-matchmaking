// Libraries
import z from 'zod';

// Application
import { USER_ERROR_CODES } from '../../domain/user/errors.ts';
import { phoneSchema } from '../../shared/validators/phone.ts';

export const registerBodySchema = z.object({
  name: z.string().min(2, USER_ERROR_CODES.INVALID_NAME).trim(),
  email: z.string().email(USER_ERROR_CODES.INVALID_EMAIL).toLowerCase().trim(),
  password: z
    .string()
    .min(8, USER_ERROR_CODES.PASSWORD_TOO_SHORT)
    .max(72, USER_ERROR_CODES.PASSWORD_TOO_LONG),
  phone: phoneSchema,
});

export type RegisterBody = z.infer<typeof registerBodySchema>;

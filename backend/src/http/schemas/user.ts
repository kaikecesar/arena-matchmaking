// Libraries
import z from 'zod';

// Application
import { phoneSchema } from '../../shared/validators/phone.ts';

export const registerUserBodySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').trim(),
  email: z.email('Email must be a valid email address.').toLowerCase().trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(72, 'Password must be at most 72 characters.'),
  phone: phoneSchema,
});

export type RegisterUserBody = z.infer<typeof registerUserBodySchema>;

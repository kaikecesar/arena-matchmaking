// Libraries
import z from 'zod';

export const loginBodySchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string(),
});

export type AuthBody = z.infer<typeof loginBodySchema>;

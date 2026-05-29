// Libraries
import { z } from 'zod';

const loginBodySchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string(),
});

const registerBodySchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  name: z.string().min(2).trim(),
  password: z.string().min(8).max(72),
  phone: z.string().min(1),
});

type LoginBody = z.infer<typeof loginBodySchema>;
type RegisterBody = z.infer<typeof registerBodySchema>;

export { loginBodySchema, registerBodySchema };
export type { LoginBody, RegisterBody };

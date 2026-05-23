// Libraries
import z from 'zod';

// E.164 international phone format. Required field; null when absent.
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'INVALID_PHONE_FORMAT')
  .nullable();

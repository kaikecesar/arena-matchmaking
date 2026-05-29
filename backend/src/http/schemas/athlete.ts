// Libraries
import z from 'zod';

// Application
import {
  ATHLETE_DOCUMENT_TYPE_VALUES,
  ATHLETE_SEX_VALUES,
} from '../../shared/enums/athlete.ts';

export const registerAthleteBodySchema = z.object({
  birthDate: z
    .string()
    .date()
    .refine((v) => new Date(v) < new Date(), 'Birth date must be in the past.'),
  sex: z.enum(ATHLETE_SEX_VALUES),
  documentType: z.enum(ATHLETE_DOCUMENT_TYPE_VALUES),
  documentValue: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(
      z
        .string()
        .regex(/^\d{11}$/, 'Document value must be a valid CPF (11 digits).'),
    ),
  photoUrl: z.url().optional(),
});

export type RegisterAthleteBody = z.infer<typeof registerAthleteBodySchema>;

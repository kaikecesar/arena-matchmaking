// Libraries
import z from 'zod';

export const errorResponseSchema = z.object({
  code: z.string(),
  message: z.string().optional(),
});

export const validationErrorResponseSchema = z.object({
  code: z.literal('VALIDATION_ERROR'),
  message: z.string(),
  issues: z
    .array(
      z.object({
        path: z.array(z.union([z.string(), z.number()])),
        message: z.string(),
      }),
    )
    .optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const ATHLETE_SEX_VALUES = ['male', 'female'] as const;
export type AthleteSex = (typeof ATHLETE_SEX_VALUES)[number];

export const ATHLETE_DOCUMENT_TYPE_VALUES = ['cpf'] as const;
export type AthleteDocumentType = (typeof ATHLETE_DOCUMENT_TYPE_VALUES)[number];

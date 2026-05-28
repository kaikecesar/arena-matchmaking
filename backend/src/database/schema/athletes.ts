// Libraries
import {
  pgTable,
  varchar,
  uuid,
  text,
  timestamp,
  date,
  pgEnum,
  unique,
} from 'drizzle-orm/pg-core';

// Application
import { usersTable } from './users.ts';

export const sexEnum = pgEnum('sex', ['male', 'female']);
export const documentTypeEnum = pgEnum('document_type', ['cpf']);

export const athletesTable = pgTable(
  'athletes',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => usersTable.id, { onDelete: 'restrict' })
      .unique()
      .notNull(),
    birthDate: date('birth_date').notNull(),
    sex: sexEnum('sex').notNull(),
    documentType: documentTypeEnum('document_type').notNull(),
    documentValue: varchar('document_value', { length: 30 }).notNull(),
    photoUrl: text('photo_url'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (table) => ({
    documentUnique: unique().on(table.documentType, table.documentValue),
  }),
);

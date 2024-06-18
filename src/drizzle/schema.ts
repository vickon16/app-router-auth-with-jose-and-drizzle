import {
  int,
  mysqlEnum,
  serial,
  text,
  mysqlTable,
  uniqueIndex,
  varchar,
  timestamp,
  time,
} from 'drizzle-orm/mysql-core';
import { InferInsertModel } from 'drizzle-orm';

export const users = mysqlTable(
  'users',
  {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).unique().notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);

export const sessions = mysqlTable('sessions', {
  id: serial('id').primaryKey(),
  userId: int('userId')
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export type NewUser = InferInsertModel<typeof users>;
export type NewSession = InferInsertModel<typeof sessions>;

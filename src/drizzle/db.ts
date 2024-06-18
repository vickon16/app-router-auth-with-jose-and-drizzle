import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { users, NewUser } from './schema';
import * as schema from './schema';

const poolConnection = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

export const db = drizzle(poolConnection, { mode: 'default', schema });

export const insertUser = async (user: NewUser) => {
  return await db.insert(users).values(user);
};

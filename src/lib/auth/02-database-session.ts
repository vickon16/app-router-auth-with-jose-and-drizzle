import 'server-only';

import { db } from '@/drizzle/db';
import { sessions } from '@/drizzle/schema';
import { cookies } from 'next/headers';
import { encrypt } from './00-auth-utils';

export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // 1. Create a session in the database
  const data = await db
    .insert(sessions)
    .values({
      userId: id,
      expiresAt,
    });

  const sessionId = data[0].insertId;

  // 2. Encrypt the session ID
  const session = await encrypt({ userId: id, expiresAt });

  // 3. Store the session in cookies for optimistic auth checks
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

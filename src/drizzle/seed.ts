import { insertUser } from '@/drizzle/db';
import { NewUser } from '@/drizzle/schema';

async function main() {
  const newUser: NewUser = {
    name: 'user',
    email: 'user@example.com',
    password: '123456',
  };

  console.log({ url: process.env.DATABASE_URL });
  const res = await insertUser(newUser);
  console.log('Sucessfully seeded users table:', res);
  process.exit();
}

main();

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  dialect : "mysql",
  breakpoints: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  out: './migrations',
});

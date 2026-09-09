import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;
let pool: pg.Pool | undefined;
export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não configurada. Defina uma conexão PostgreSQL antes de iniciar a API.");
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 10, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined });
  return drizzle(pool, { schema });
}
export type Database = ReturnType<typeof getDb>;

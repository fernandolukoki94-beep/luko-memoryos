import { createHash, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { sessions, users } from "../db/schema";

const COOKIE = "cyberhub_session";
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET ?? "development-only-change-me");
export async function issueSession(userId: number) { const jti = randomUUID(); const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); const token = await new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setJti(jti).setIssuedAt().setExpirationTime("30d").sign(secret()); const db = getDb(); await db.insert(sessions).values({ userId, tokenHash: hashToken(token), expiresAt }); const jar = await cookies(); jar.set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", expires: expiresAt, path: "/" }); return token; }
export function hashToken(token: string) { return createHash("sha256").update(token).digest("hex"); }
export async function currentUser() { const token = (await cookies()).get(COOKIE)?.value; if (!token) return null; try { const { payload } = await jwtVerify(token, secret()); const userId = Number(payload.userId); if (!userId) return null; const rows = await getDb().select({ id: users.id, username: users.username, email: users.email, firstName: users.firstName, lastName: users.lastName, role: users.role, suspended: users.suspended }).from(users).where(eq(users.id, userId)).limit(1); const user = rows[0]; if (!user || user.suspended) return null; return user; } catch { return null; } }
export async function clearSession() { const jar = await cookies(); const token = jar.get(COOKIE)?.value; if (token) { try { await getDb().delete(sessions).where(eq(sessions.tokenHash, hashToken(token))); } catch {} } jar.delete(COOKIE); }

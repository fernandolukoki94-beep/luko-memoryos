import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { profiles, users } from "../../../../db/schema";
import { registerSchema } from "../../../../shared/validation";
import { issueSession } from "../../../../lib/auth";
export async function POST(request: Request) { try { const input = registerSchema.parse(await request.json()); const db = getDb(); const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, input.email.toLowerCase())).limit(1); if (existing.length) return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 }); const passwordHash = await bcrypt.hash(input.password, 12); const [user] = await db.insert(users).values({ ...input, email: input.email.toLowerCase(), passwordHash }).returning({ id: users.id, username: users.username, email: users.email, firstName: users.firstName, lastName: users.lastName }); await db.insert(profiles).values({ userId: user.id }); await issueSession(user.id); return NextResponse.json({ user }, { status: 201 }); } catch (error) { if (error instanceof Error && error.name === "ZodError") return NextResponse.json({ error: "Données invalides", details: error }, { status: 400 }); return NextResponse.json({ error: "Impossible de créer le compte" }, { status: 500 }); } }

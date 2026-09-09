import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { users } from "../../../../db/schema";
import { loginSchema } from "../../../../shared/validation";
import { issueSession } from "../../../../lib/auth";
export async function POST(request: Request) { try { const input = loginSchema.parse(await request.json()); const [user] = await getDb().select().from(users).where(eq(users.email, input.email.toLowerCase())).limit(1); if (!user || user.suspended || !(await bcrypt.compare(input.password, user.passwordHash))) return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 }); await issueSession(user.id); return NextResponse.json({ user: { id: user.id, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } }); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); } }

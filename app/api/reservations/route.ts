import { NextResponse } from "next/server";
import { and, eq, gt, lt } from "drizzle-orm";
import { getDb } from "../../../db";
import { computers, reservations } from "../../../db/schema";
import { currentUser } from "../../../lib/auth";
import { z } from "zod";
const reservationSchema = z.object({ computerId: z.number().int().positive(), startsAt: z.coerce.date(), endsAt: z.coerce.date() }).refine((value) => value.endsAt > value.startsAt, { message: "La fin doit être après le début" });
export async function GET() { try { const data = await getDb().select().from(computers); return NextResponse.json({ computers: data }); } catch { return NextResponse.json({ error: "Base de données indisponible" }, { status: 503 }); } }
export async function POST(request: Request) { const user = await currentUser(); if (!user) return NextResponse.json({ error: "Authentification requise" }, { status: 401 }); try { const input = reservationSchema.parse(await request.json()); const conflict = await getDb().select({ id: reservations.id }).from(reservations).where(and(eq(reservations.computerId, input.computerId), eq(reservations.status, "confirmed"), lt(reservations.startsAt, input.endsAt), gt(reservations.endsAt, input.startsAt))).limit(1); if (conflict.length) return NextResponse.json({ error: "Ce poste est déjà réservé sur cette période" }, { status: 409 }); const [reservation] = await getDb().insert(reservations).values({ ...input, userId: user.id }).returning(); return NextResponse.json({ reservation }, { status: 201 }); } catch { return NextResponse.json({ error: "Réservation invalide" }, { status: 400 }); } }

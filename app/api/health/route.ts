import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ ok: true, service: "cyberhub-api", timestamp: new Date().toISOString(), databaseConfigured: Boolean(process.env.DATABASE_URL) }); }

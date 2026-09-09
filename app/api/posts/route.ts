import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { posts, users } from "../../../db/schema";
import { postSchema } from "../../../shared/validation";
import { currentUser } from "../../../lib/auth";
export async function GET() { try { const data = await getDb().select({ id: posts.id, body: posts.body, likesCount: posts.likesCount, commentsCount: posts.commentsCount, createdAt: posts.createdAt, author: { id: users.id, username: users.username, firstName: users.firstName, lastName: users.lastName, avatar: users.avatar } }).from(posts).innerJoin(users, eq(posts.authorId, users.id)).orderBy(desc(posts.createdAt)).limit(50); return NextResponse.json({ posts: data }); } catch { return NextResponse.json({ error: "Base de données indisponible" }, { status: 503 }); } }
export async function POST(request: Request) { const user = await currentUser(); if (!user) return NextResponse.json({ error: "Authentification requise" }, { status: 401 }); try { const { body } = postSchema.parse(await request.json()); const [post] = await getDb().insert(posts).values({ authorId: user.id, body }).returning(); return NextResponse.json({ post }, { status: 201 }); } catch { return NextResponse.json({ error: "Publication invalide" }, { status: 400 }); } }

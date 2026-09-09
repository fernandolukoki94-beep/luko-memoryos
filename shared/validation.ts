import { z } from "zod";
export const registerSchema = z.object({ username: z.string().min(3).max(40).regex(/^[a-zA-Z0-9_]+$/, "Username inválido"), email: z.string().email(), password: z.string().min(8).max(72), firstName: z.string().min(1).max(80), lastName: z.string().min(1).max(80) });
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1).max(72) });
export const postSchema = z.object({ body: z.string().trim().min(1).max(2000) });
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

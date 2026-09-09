# CYBERHUB — base full-stack

A aplicação usa Next.js App Router, Route Handlers REST, Drizzle ORM e PostgreSQL. A interface CYBERHUB existente foi reaproveitada como Client Component para manter os fluxos de navegação e jogos, enquanto a fundação server-side substitui gradualmente os estados locais.

## Configuração

1. Copiar `.env.example` para `.env.local`.
2. Definir `DATABASE_URL` para PostgreSQL e uma `JWT_SECRET` aleatória.
3. Executar `pnpm db:generate` e `pnpm db:migrate`.
4. Executar `pnpm dev`.

Sem `DATABASE_URL`, a interface continua a compilar, mas os endpoints persistentes retornam erro 503. Não existe fallback silencioso para dados inventados.

## Endpoints implementados

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET|POST /api/posts`
- `GET|POST /api/reservations`

A especificação OpenAPI está em `docs/openapi.yaml`. A próxima fase deve ligar o feed e as reservas do frontend a estes endpoints e acrescentar likes, comentários, scores, sessões PC, notificações e dashboard administrativo.

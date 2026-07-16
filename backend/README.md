# Luko Memories (MemoryOS) - Backend

## O Cofre Digital da Sua Vida

Este é o backend da aplicação Luko Memories, construído com Node.js (Express) e PostgreSQL para gerenciar os dados e a lógica de negócio da aplicação.

## Tecnologias Utilizadas

- **Linguagem:** Node.js
- **Framework:** Express.js
- **Base de Dados:** PostgreSQL
- **Autenticação:** JWT (JSON Web Tokens)

## Estrutura do Projeto

```
backend/
├── src/
│   ├── config/         # Configurações (DB, etc.)
│   ├── controllers/    # Lógica de negócio
│   ├── middleware/     # Middlewares de autenticação, etc.
│   ├── models/         # Modelos de dados (interação com DB)
│   ├── routes/         # Definição de rotas da API
│   └── server.js       # Ponto de entrada do servidor
└── package.json
```

## Como Configurar e Executar (Desenvolvimento)

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- PostgreSQL

### 1. Navegue até o diretório `backend`:
```bash
cd backend
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um ficheiro `.env` na raiz do diretório `backend` com as seguintes variáveis:

```
PORT=3001
DB_USER=seu_usuario_pg
DB_HOST=localhost
DB_NAME=luko_memories_db
DB_PASSWORD=sua_senha_pg
DB_PORT=5432
JWT_SECRET=sua_chave_secreta_jwt
```

### 4. Configurar a Base de Dados
Conecte-se ao seu servidor PostgreSQL e execute o script `src/config/schema.sql` para criar as tabelas necessárias:

```sql
-- Conteúdo de src/config/schema.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  foto VARCHAR(255)
);

CREATE TABLE memories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  data DATE,
  local VARCHAR(255),
  emocao VARCHAR(255)
);

CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  memory_id INTEGER NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  tipo VARCHAR(50) NOT NULL, -- e.g., 'photo', 'video', 'audio'
  arquivo_url VARCHAR(255) NOT NULL
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  memory_id INTEGER NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE future_messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mensagem TEXT NOT NULL,
  data_abertura DATE NOT NULL
);
```

### 5. Iniciar o Servidor
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3001`.

## Contribuição

Para contribuir com o backend, por favor, siga as diretrizes de contribuição do projeto principal.

## Licença

Este projeto está licenciado sob a licença MIT.

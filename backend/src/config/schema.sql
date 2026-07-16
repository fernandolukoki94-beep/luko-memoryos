-- Tabela de usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  foto VARCHAR(255),
  bio TEXT,
  data_nascimento DATE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de memórias com suporte a criptografia e privacidade
CREATE TABLE memories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  descricao_criptografada TEXT, -- Versão criptografada da descrição
  data DATE,
  local VARCHAR(255),
  emocao VARCHAR(255),
  privacidade VARCHAR(50) DEFAULT 'privada', -- 'privada', 'familia', 'publica'
  criptografada BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de eventos de vida (timeline)
CREATE TABLE life_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ano INTEGER NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo VARCHAR(50), -- 'nascimento', 'educacao', 'trabalho', 'relacionamento', 'conquista', 'outro'
  icone VARCHAR(50),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de mídia com suporte a privacidade
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  memory_id INTEGER NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  tipo VARCHAR(50) NOT NULL, -- 'photo', 'video', 'audio'
  arquivo_url VARCHAR(255) NOT NULL,
  privada BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de comentários
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  memory_id INTEGER NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de mensagens futuras
CREATE TABLE future_messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mensagem TEXT NOT NULL,
  data_abertura DATE NOT NULL,
  aberta BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de sessões para gerenciamento de tokens
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expira_em TIMESTAMP WITH TIME ZONE NOT NULL,
  ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de transformações de IA em memórias
CREATE TABLE memory_ai_transformations (
  id SERIAL PRIMARY KEY,
  memory_id INTEGER NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  tipo VARCHAR(50), -- 'poetic', 'summary', 'tribute', 'enhancement'
  conteudo_original TEXT,
  conteudo_transformado TEXT,
  modelo_ia VARCHAR(100),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhorar performance
CREATE INDEX idx_memories_user_id ON memories(user_id);
CREATE INDEX idx_memories_data ON memories(data);
CREATE INDEX idx_life_events_user_id ON life_events(user_id);
CREATE INDEX idx_media_memory_id ON media(memory_id);
CREATE INDEX idx_comments_memory_id ON comments(memory_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token_hash ON sessions(token_hash);
CREATE INDEX idx_future_messages_user_id ON future_messages(user_id);

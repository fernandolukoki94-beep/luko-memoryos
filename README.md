# Luko Memories (MemoryOS)

## O Cofre Digital da Sua Vida

Bem-vindo ao Luko Memories, um projeto ambicioso que visa criar um "cofre digital da vida" onde cada pessoa pode guardar e reviver seus momentos, histórias e sentimentos mais preciosos. Mais do que um simples diário, o MemoryOS é uma plataforma completa para preservar a sua jornada de vida de forma rica e interativa.

## Visão Geral do Projeto

Este projeto combina o poder da programação com a profundidade das emoções humanas, utilizando tecnologias modernas de backend, frontend e inteligência artificial para oferecer uma experiência única. É um projeto de portfólio robusto, ideal para demonstrar habilidades em desenvolvimento full-stack, gestão de bases de dados e integração de IA.

## Funcionalidades Principais

### 1. Conta do Usuário
- **Criação de Conta/Login:** Sistema seguro de autenticação.
- **Perfil Pessoal:** Gerenciamento de informações e foto de perfil.
- **Configurações de Privacidade:** Controle total sobre quem pode ver suas memórias.

### 2. Criação de Memórias Detalhadas
Cada memória pode incluir:
- 📸 **Fotos:** Imagens para ilustrar seus momentos.
- 🎥 **Vídeos:** Clipes que capturam a essência de cada evento.
- 🎵 **Áudios:** Gravações de voz contando a história por trás da memória.
- ✍️ **Texto:** Descrições detalhadas e reflexões.
- 📍 **Local:** Onde a memória aconteceu.
- 📅 **Data:** Quando a memória foi criada ou ocorreu.
- 😊 **Estado Emocional:** Registre como você se sentiu (feliz, triste, saudade, amor, conquista).

### 3. Linha do Tempo (Timeline)
Visualize sua vida como uma narrativa cronológica, com todos os eventos importantes organizados em uma linha do tempo interativa.

### 4. Memórias Privadas, Familiares ou Públicas
Escolha o nível de privacidade para cada memória:
- 🔒 **Privada:** Apenas você pode ver.
- 👥 **Família:** Compartilhe com pessoas autorizadas.
- 🌍 **Pública:** Transforme suas histórias em uma rede social de memórias.

### 5. Inteligência Artificial (IA)
Um "assistente de memória" inteligente que pode:
- **Organizar Fotos Automaticamente:** Categorização e sugestões inteligentes.
- **Criar Textos:** Gerar descrições poéticas ou resumos com base nas suas memórias.
- **Resumo da Vida:** Criar um resumo da sua jornada de vida.
- **Vídeos de Homenagem:** Gerar vídeos comemorativos a partir de suas fotos e vídeos.

### 6. Caixa do Futuro
Envie mensagens para o seu "eu" do futuro, com a opção de definir uma data específica para a abertura da mensagem (ex: daqui a 10 anos).

### 7. Memórias de Pessoas que Partiram
Um memorial digital para homenagear entes queridos, com fotos, histórias, mensagens e datas importantes.

## Tecnologias Utilizadas

### Backend
- **Linguagem:** Node.js
- **Framework:** Express.js
- **Base de Dados:** PostgreSQL
- **Autenticação:** JWT (JSON Web Tokens)

### Frontend
- **Framework:** React
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Roteamento:** React Router DOM

## Estrutura do Projeto

```
luko-social/
├── backend/                # Servidor Node.js (Express)
│   ├── src/
│   │   ├── config/         # Configurações (DB, etc.)
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── middleware/     # Middlewares de autenticação, etc.
│   │   ├── models/         # Modelos de dados (interação com DB)
│   │   ├── routes/         # Definição de rotas da API
│   │   └── server.js       # Ponto de entrada do servidor
│   └── package.json
├── frontend/               # Aplicação React
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/
│   │   └── styles/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .env.example            # Exemplo de variáveis de ambiente
├── README.md               # Este ficheiro
└── ... (outros ficheiros do repositório original)
```

## Como Configurar e Executar (Desenvolvimento)

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- PostgreSQL

### 1. Clonar o Repositório
```bash
git clone https://github.com/fernandolukoki94-beep/luko-social.git
cd luko-social
```

### 2. Configurar o Backend
```bash
cd backend
npm install
cp ../.env.example .env
# Edite o ficheiro .env com as suas credenciais do PostgreSQL e JWT_SECRET
# Execute o script SQL em src/config/schema.sql para criar as tabelas no seu DB
npm run dev
```

### 3. Configurar o Frontend
```bash
cd ../frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:3001`.

## Contribuição

Contribuições são bem-vindas! Por favor, leia o `CONTRIBUTING.md` para mais detalhes sobre como contribuir para este projeto.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o ficheiro `LICENSE` para mais detalhes.

---

**MemoryOS — Your Digital Life Archive**

*Um projeto de Fernando Lukoki*

# Luko Social - Rede Social com Chat 🎉

Uma aplicação web moderna estilo **Instagram + WhatsApp** construída com **React**, **Firebase** e **Tailwind CSS**, totalmente configurada como **PWA** para instalação no telemóvel.

## 🚀 Funcionalidades

### 📸 Funcionalidades Instagram-style
- **Feed de Posts** - Vê posts dos teus amigos
- **Stories** - Partilha momentos que desaparecem em 24h
- **Likes e Comentários** - Interage com posts
- **Perfil de Utilizador** - Edita teu bio e foto

### 💬 Funcionalidades WhatsApp-style
- **Chat em Tempo Real** - Mensagens instantâneas
- **Conversas** - Organiza teus chats
- **Status Online** - Vê quem está online
- **Notificações** - Recebe alertas de novas mensagens

### 📱 PWA (Progressive Web App)
- **Instalável no Telemóvel** - Funciona como app nativa
- **Offline** - Funciona sem internet
- **Push Notifications** - Recebe notificações
- **Home Screen** - Adiciona à tela inicial

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Firebase (Auth, Firestore, Storage, Realtime Database)
- **PWA**: Service Worker + Manifest.json
- **Routing**: Wouter (lightweight router)
- **UI Components**: shadcn/ui

## 📋 Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Conta Firebase (já configurada)

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/teu-usuario/luko-social.git
cd luko-social

# Instala dependências
pnpm install

# Inicia o servidor de desenvolvimento
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

## 🔐 Configuração Firebase

A configuração Firebase já está incluída no arquivo `client/src/lib/firebase.ts`. Se precisares de alterar:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};
```

## 🚀 Deploy no GitHub Pages

### 1. Criar repositório no GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/teu-usuario/luko-social.git
git push -u origin main
```

### 2. Configurar GitHub Pages

1. Vai a **Settings** → **Pages**
2. Seleciona **Deploy from a branch**
3. Escolhe a branch **main** e pasta **/ (root)**
4. Clica em **Save**

### 3. Build e Deploy

```bash
# Build para produção
pnpm build

# Deploy (automático com GitHub Actions ou manual)
git add dist/
git commit -m "Deploy to GitHub Pages"
git push
```

A app estará disponível em: `https://teu-usuario.github.io/luko-social`

## 📱 Instalar como App

### No Chrome/Android
1. Abre a app no navegador
2. Clica no menu (⋮) → **Instalar app**
3. Confirma a instalação

### No Safari/iOS
1. Abre a app no Safari
2. Clica em **Partilhar** → **Adicionar à Tela Inicial**
3. Confirma

## 🎨 Design

A aplicação usa o design **Playful & Vibrant** com:
- **Cores Primárias**: Rosa (#FF1493), Cyan (#00D9FF), Amarelo (#FFD700)
- **Tipografia**: Poppins (display) + Inter (body)
- **Rounded Corners**: 1rem (16px) para sensação amigável
- **Animações**: Transições suaves e feedback visual

## 📁 Estrutura do Projeto

```
luko-social/
├── client/
│   ├── public/
│   │   ├── manifest.json      # PWA manifest
│   │   ├── sw.js              # Service Worker
│   │   └── favicon.ico
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Auth.tsx        # Login/Signup
│   │   │   ├── Feed.tsx        # Feed principal
│   │   │   ├── Chat.tsx        # Chat em tempo real
│   │   │   └── Profile.tsx     # Perfil do utilizador
│   │   ├── components/
│   │   │   └── BottomNav.tsx   # Navegação mobile
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx # Autenticação
│   │   │   └── ThemeContext.tsx
│   │   ├── lib/
│   │   │   ├── firebase.ts     # Config Firebase
│   │   │   └── types.ts        # TypeScript types
│   │   ├── App.tsx             # Root component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   └── index.html              # HTML template
├── package.json
└── README.md
```

## 🔧 Variáveis de Ambiente

Cria um arquivo `.env.local` (opcional):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 📚 Documentação

- [React Docs](https://react.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 🐛 Troubleshooting

### A app não carrega
- Verifica a consola do navegador (F12)
- Confirma que o Firebase está configurado corretamente
- Limpa o cache: Ctrl+Shift+Delete

### Service Worker não funciona
- Certifica-te que estás em HTTPS (ou localhost)
- Verifica em DevTools → Application → Service Workers

### PWA não instala
- Verifica se o manifest.json está correto
- Confirma que tens um ícone válido
- Tenta noutro navegador

## 📝 Licença

MIT License - Sinta-se livre para usar e modificar!

## 👨‍💻 Autor

Criado com ❤️ para conectar pessoas

---

**Dica**: Para melhor experiência, usa a app no telemóvel! 📱

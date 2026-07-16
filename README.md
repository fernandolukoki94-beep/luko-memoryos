# 🧠 Luko MemoryOS

## O Cofre Digital da Sua Vida

> Guarde momentos. Preserve histórias. Reviva emoções.

Bem-vindo ao **Luko MemoryOS**, uma plataforma ambiciosa desenhada para ser o "cofre digital" definitivo. Aqui, cada pessoa pode guardar e reviver seus momentos, histórias e sentimentos mais preciosos de forma segura, rica e interativa.

---

## 🌟 Visão Geral

O **MemoryOS** combina o poder da tecnologia moderna com a profundidade das emoções humanas. É mais do que um diário; é um arquivo de vida digital que utiliza Inteligência Artificial para transformar memórias comuns em narrativas poéticas e homenagens duradouras.

## 🚀 Stack Utilizada

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT (JSON Web Tokens) com bcryptjs
- **Segurança:** AES-256-GCM para criptografia de dados sensíveis

### Frontend
- **Framework:** React + TypeScript
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Roteamento:** Wouter

---

## ✨ Funcionalidades Principais

### 1. 🔐 Cofre de Memórias Criptografado
Sistema de criptografia de ponta a ponta para memórias sensíveis. Seus segredos e momentos mais íntimos estão protegidos por algoritmos de nível bancário.

### 2. 🤖 Memory AI (Assistente Inteligente)
- **Transformação Poética:** Transforma descrições simples em textos líricos.
- **Resumo de Vida:** Cria resumos automáticos de períodos da sua jornada.
- **Análise de Sentimento:** Identifica as emoções predominantes nas suas memórias.
- **Homenagens:** Gera tributos especiais para entes queridos.

### 3. 👤 Perfil: Biografia Viva
Visualize sua vida através de uma timeline interativa que organiza eventos históricos e memórias pessoais em uma narrativa cronológica contínua.

### 4. 🔒 Privacidade Total
Controle granular sobre quem pode ver suas memórias:
- **Privada:** Apenas para seus olhos.
- **Família:** Compartilhe com o círculo íntimo.
- **Pública:** Transforme suas histórias em inspiração para outros.

### 5. 📦 Caixa do Futuro
Envie mensagens e memórias para o seu "eu" do futuro, programadas para abrir em datas específicas.

---

## 📂 Estrutura do Projeto

```
luko-memoryos/
├── backend/                # Servidor Node.js (Arquitetura Modular)
│   ├── src/
│   │   ├── auth/           # Autenticação e Sessões
│   │   ├── users/          # Gestão de Usuários
│   │   ├── memories/       # Core: Gestão de Memórias
│   │   ├── ai/             # Integração com LLMs
│   │   ├── life-events/    # Timeline e Biografia
│   │   └── config/         # Configurações globais
├── client/                 # Aplicação React + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes UI reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── contexts/       # Gerenciamento de estado global
│   │   └── hooks/          # Hooks customizados
└── docs/                   # Documentação e Assets Visuais
```

---

## 🗺️ Roadmap de Funcionalidades Premium

- [ ] **Memory Map 🌍:** Visualize geograficamente onde suas memórias aconteceram.
- [ ] **Family Tree 🌳:** Árvore genealógica interativa integrada com histórias de vida.
- [ ] **Life Book 📖:** Exporte sua jornada de vida para um livro digital em PDF com design premium.
- [ ] **Suporte Multi-mídia:** Armazenamento seguro de áudio de alta fidelidade e vídeos 4K.
- [ ] **App Mobile Nativo:** Versão para Android e iOS com notificações push.

---

## 🛠️ Como Configurar e Executar

### Pré-requisitos
- Node.js (v18+)
- PostgreSQL
- OpenAI API Key (para funcionalidades de IA)

### 1. Clonar e Instalar
```bash
git clone https://github.com/fernandolukoki94-beep/luko-memoryos.git
cd luko-memoryos
```

### 2. Configurar Variáveis
Copie o arquivo `.env.example` para `.env` e preencha as suas credenciais.

### 3. Executar
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../client
npm install
npm run dev
```

---

## 🤝 Contribuição

Contribuições são o que tornam a comunidade open source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

**MemoryOS — Preserve sua essência.**
*Desenvolvido por Fernando Lukoki*

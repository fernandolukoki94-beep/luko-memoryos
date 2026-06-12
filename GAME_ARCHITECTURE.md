# Fernando Lukoki: Luta e Aventura - Arquitetura Completa do Jogo

## 📋 Visão Geral

**Fernando Lukoki: Luta e Aventura** é um jogo RPG de ação 2D desenvolvido em HTML5/Canvas com JavaScript vanilla. O jogo apresenta um sistema de combate corpo a corpo, progressão de personagem, inimigos com IA, mapas exploráveis e um sistema completo de RPG com inventário, missões e habilidades.

---

## 🎮 Estrutura de Arquivos

```
Fernando-Lukoki-Adventure/
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── manifest.json
│   ├── src/
│   │   ├── game/
│   │   │   ├── core/
│   │   │   │   ├── GameEngine.ts          # Motor principal do jogo
│   │   │   │   ├── GameState.ts           # Gerenciador de estado global
│   │   │   │   ├── InputHandler.ts        # Entrada de teclado/mouse
│   │   │   │   ├── Renderer.ts            # Sistema de renderização Canvas
│   │   │   │   └── Physics.ts             # Sistema de física/colisão
│   │   │   ├── entities/
│   │   │   │   ├── Player.ts              # Classe do personagem principal
│   │   │   │   ├── Enemy.ts               # Classe base de inimigos
│   │   │   │   ├── EnemyStone.ts          # Inimigo de pedra específico
│   │   │   │   ├── Projectile.ts          # Projéteis/efeitos
│   │   │   │   └── Entity.ts              # Classe base de entidades
│   │   │   ├── systems/
│   │   │   │   ├── CombatSystem.ts        # Sistema de combate
│   │   │   │   ├── RPGSystem.ts           # Sistema de RPG (XP, níveis, stats)
│   │   │   │   ├── InventorySystem.ts     # Gerenciador de inventário
│   │   │   │   ├── QuestSystem.ts         # Sistema de missões
│   │   │   │   ├── AISystem.ts            # IA dos inimigos
│   │   │   │   ├── ParticleSystem.ts      # Efeitos visuais
│   │   │   │   └── AudioSystem.ts         # Sistema de som
│   │   │   ├── maps/
│   │   │   │   ├── Map.ts                 # Classe base de mapas
│   │   │   │   ├── MapForest.ts           # Mapa da floresta
│   │   │   │   ├── MapRuins.ts            # Mapa das ruínas
│   │   │   │   ├── MapTemple.ts           # Mapa do templo final
│   │   │   │   ├── TileMap.ts             # Sistema de tile-based rendering
│   │   │   │   └── MapGenerator.ts        # Geração procedural de mapas
│   │   │   ├── ui/
│   │   │   │   ├── HUD.ts                 # Interface de jogo (vida, XP, minimapa)
│   │   │   │   ├── Menu.ts                # Menu principal
│   │   │   │   ├── PauseMenu.ts           # Menu de pausa
│   │   │   │   ├── InventoryUI.ts         # Interface de inventário
│   │   │   │   ├── QuestLog.ts            # Log de missões
│   │   │   │   ├── SkillTree.ts           # Árvore de habilidades
│   │   │   │   └── UIManager.ts           # Gerenciador de UI
│   │   │   ├── data/
│   │   │   │   ├── items.json             # Dados de itens
│   │   │   │   ├── enemies.json           # Dados de inimigos
│   │   │   │   ├── quests.json            # Dados de missões
│   │   │   │   ├── skills.json            # Dados de habilidades
│   │   │   │   └── maps.json              # Dados de mapas
│   │   │   ├── assets/
│   │   │   │   ├── sprites/               # Sprites do personagem e inimigos
│   │   │   │   ├── tilesets/              # Tilesets dos mapas
│   │   │   │   ├── particles/             # Efeitos de partículas
│   │   │   │   ├── ui/                    # Elementos de UI
│   │   │   │   ├── audio/
│   │   │   │   │   ├── music/             # Músicas de fundo
│   │   │   │   │   ├── sfx/               # Efeitos sonoros
│   │   │   │   │   └── voice/             # Vozes/diálogos
│   │   │   │   └── fonts/                 # Fontes customizadas
│   │   │   ├── utils/
│   │   │   │   ├── SaveSystem.ts          # Sistema de save/load
│   │   │   │   ├── MathUtils.ts           # Funções matemáticas
│   │   │   │   ├── AnimationUtils.ts      # Utilitários de animação
│   │   │   │   └── Logger.ts              # Sistema de logging
│   │   │   └── constants/
│   │   │       ├── GameConfig.ts          # Configurações do jogo
│   │   │       ├── Constants.ts           # Constantes globais
│   │   │       └── Enums.ts               # Enumerações
│   │   ├── pages/
│   │   │   ├── GamePage.tsx               # Página principal do jogo
│   │   │   ├── MenuPage.tsx               # Página de menu
│   │   │   └── NotFound.tsx               # Página 404
│   │   ├── components/
│   │   │   └── GameCanvas.tsx             # Componente Canvas do jogo
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── server/
│   └── index.ts                           # Servidor Express (placeholder)
├── shared/
│   └── const.ts                           # Constantes compartilhadas
├── README.md                              # README principal
├── GAME_ARCHITECTURE.md                   # Este arquivo
├── DEVELOPMENT_PLAN.md                    # Plano de desenvolvimento
└── package.json
```

---

## 🎯 Funcionalidades Principais

### 1. **Sistema de Personagem**
- **Movimento**: WASD ou Setas para andar
- **Salto**: Espaço para saltar
- **Ataque**: Clique do mouse ou tecla de ataque
- **Barra de Vida**: Visualização em tempo real de HP
- **Experiência**: Sistema de XP e níveis
- **Inventário**: Armazenamento de itens

### 2. **Sistema de Combate**
- **Ataque Corpo a Corpo**: Dano baseado em stats
- **Cooldown de Ataque**: Tempo entre ataques
- **Knockback**: Empurrão ao acertar inimigos
- **Crítico**: Chance de dano crítico
- **Defesa**: Redução de dano baseada em armadura

### 3. **Sistema de Inimigos**
- **Monstro de Pedra**: Inimigo básico com IA simples
- **Patrulha**: Movimento automático em área
- **Perseguição**: Seguir o jogador quando detectado
- **Ataque**: Ataque corpo a corpo
- **Drop de Itens**: Loot ao derrotar

### 4. **Sistema RPG**
- **Experiência (XP)**: Ganho ao derrotar inimigos
- **Níveis**: Progressão de personagem
- **Stats**: Força, Defesa, Velocidade, Vitalidade
- **Moedas**: Moeda do jogo
- **Habilidades**: Árvore de habilidades desbloqueáveis

### 5. **Mapas**
- **Floresta**: Mapa inicial com inimigos básicos
- **Ruínas**: Mapa intermediário com desafios maiores
- **Templo Final**: Boss final e conclusão

### 6. **Sistema de Missões**
- **Missões Principais**: Avanço da história
- **Missões Secundárias**: Conteúdo adicional
- **Objetivos**: Derrotar inimigos, coletar itens
- **Recompensas**: XP, ouro, itens

### 7. **Interface do Jogo**
- **HUD**: Vida, XP, minimapa, ouro
- **Menu Principal**: Iniciar, carregar, opções
- **Menu de Pausa**: Continuar, inventário, missões
- **Inventário**: Gerenciamento de itens
- **Log de Missões**: Rastreamento de objetivos
- **Árvore de Habilidades**: Desbloqueio de habilidades

---

## 🔧 Tecnologias Utilizadas

| Tecnologia | Propósito |
|-----------|----------|
| **HTML5 Canvas** | Renderização 2D |
| **JavaScript/TypeScript** | Lógica do jogo |
| **React 19** | Framework UI |
| **Tailwind CSS 4** | Estilização |
| **Vite** | Build tool |
| **Web Audio API** | Sistema de som |
| **LocalStorage** | Sistema de save |

---

## 🎨 Estilo Visual

- **Gráficos**: Pixel art 2D
- **Perspectiva**: Vista de cima (top-down)
- **Paleta de Cores**: Tons de verde (floresta), cinza (ruínas), dourado (templo)
- **Animações**: Sprite-based com frame-by-frame
- **Efeitos**: Partículas para ataques, dano, morte

---

## 💾 Sistema de Save

- **Formato**: JSON no LocalStorage
- **Dados Salvos**: Posição, nível, XP, inventário, progresso de missões
- **Auto-Save**: A cada mudança de mapa
- **Slots**: Até 3 slots de save

---

## 🤖 Sistema de IA

### Comportamento dos Inimigos
1. **Patrulha**: Movimento em padrão definido
2. **Detecção**: Raio de visão (ex: 200px)
3. **Perseguição**: Seguir o jogador
4. **Ataque**: Atacar quando em alcance
5. **Fuga**: Recuar se vida baixa (opcional)
6. **Morte**: Desaparecer com efeito

### Algoritmo de Pathfinding
- **A***: Para navegação em mapas complexos
- **Simples**: Para inimigos básicos (distância direta)

---

## 📊 Progressão do Jogo

### Níveis de Dificuldade
- **Fácil**: Inimigos fracos, mais XP
- **Normal**: Balanço padrão
- **Difícil**: Inimigos fortes, menos XP

### Curva de Experiência
```
XP para próximo nível = 100 * (nível atual)^1.2
```

### Stats por Nível
- **Força**: +2 por nível
- **Defesa**: +1 por nível
- **Velocidade**: +0.5 por nível
- **Vitalidade**: +5 HP por nível

---

## 🎯 Fluxo de Jogo

```
Menu Principal
    ↓
Seleção de Dificuldade
    ↓
Mapa da Floresta (Tutorial)
    ↓
Mapa das Ruínas (Desafio)
    ↓
Mapa do Templo (Boss Final)
    ↓
Tela de Vitória
```

---

## 🔄 Ciclo de Atualização do Jogo

```
1. Input Handler: Captura entrada do usuário
2. Game Logic: Atualiza posição, colisão, IA
3. Combat System: Processa dano, morte
4. RPG System: Atualiza XP, níveis
5. Renderer: Desenha tudo no Canvas
6. Audio: Reproduz sons
```

**FPS**: 60 FPS (16.67ms por frame)

---

## 📈 Escalabilidade e Melhorias Futuras

### Curto Prazo
- [ ] Sistema de save automático
- [ ] Mais tipos de inimigos
- [ ] Mais mapas
- [ ] Sistema de diálogos

### Médio Prazo
- [ ] Multiplayer local (2 jogadores)
- [ ] Sistema de achievements
- [ ] Leaderboard online
- [ ] Customização de personagem

### Longo Prazo
- [ ] Multiplayer online
- [ ] Geração procedural de mapas
- [ ] Sistema de mods
- [ ] Editor de mapas

---

## 🚀 Plano de Desenvolvimento

Veja `DEVELOPMENT_PLAN.md` para detalhes sobre fases de desenvolvimento, timeline e milestones.

---

## 📝 Notas de Desenvolvimento

### Boas Práticas
- Usar TypeScript para type safety
- Separação clara de responsabilidades
- Componentes reutilizáveis
- Documentação inline
- Testes unitários para sistemas críticos

### Performance
- Culling de entidades fora da câmera
- Object pooling para projéteis
- Lazy loading de assets
- Canvas double-buffering

### Debugging
- Console logging estruturado
- Modo debug visual (hitboxes, grid)
- Profiling de performance

---

## 👨‍💻 Autor

**Fernando Lukoki** - Desenvolvedor

---

## 📄 Licença

MIT License - Veja LICENSE para detalhes.

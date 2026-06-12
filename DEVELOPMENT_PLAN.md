# Plano de Desenvolvimento - Fernando Lukoki: Luta e Aventura

## 📅 Timeline Geral

| Fase | Duração | Status |
|------|---------|--------|
| **Fase 1: Motor Base** | 2-3 dias | Em Progresso |
| **Fase 2: Personagem e Combate** | 2-3 dias | Planejado |
| **Fase 3: Inimigos e IA** | 2-3 dias | Planejado |
| **Fase 4: Mapas e Exploração** | 2-3 dias | Planejado |
| **Fase 5: Sistema RPG** | 2-3 dias | Planejado |
| **Fase 6: Interface e HUD** | 1-2 dias | Planejado |
| **Fase 7: Audio e Efeitos** | 1-2 dias | Planejado |
| **Fase 8: Polimento e Testes** | 1-2 dias | Planejado |

**Total Estimado**: 2-3 semanas para versão completa

---

## 🎯 Fase 1: Motor Base do Jogo

### Objetivos
- [ ] Configurar estrutura React + Canvas
- [ ] Criar GameEngine principal
- [ ] Implementar InputHandler
- [ ] Criar Renderer básico
- [ ] Sistema de GameState

### Arquivos a Criar
```
client/src/game/
├── core/
│   ├── GameEngine.ts
│   ├── GameState.ts
│   ├── InputHandler.ts
│   ├── Renderer.ts
│   └── Physics.ts
├── constants/
│   ├── GameConfig.ts
│   ├── Constants.ts
│   └── Enums.ts
└── utils/
    ├── MathUtils.ts
    └── Logger.ts
```

### Tarefas Específicas
1. **GameEngine.ts**
   - Loop de jogo (update/render)
   - Gerenciamento de FPS
   - Pausa/resume

2. **InputHandler.ts**
   - Captura de teclado (WASD, Espaço, Mouse)
   - Mapeamento de controles
   - Detecção de cliques

3. **Renderer.ts**
   - Contexto Canvas 2D
   - Funções de desenho (retângulos, círculos, sprites)
   - Câmera/viewport

4. **Physics.ts**
   - Detecção de colisão AABB
   - Movimento com gravidade
   - Knockback

### Checklist de Conclusão
- [ ] Jogo roda com 60 FPS
- [ ] Canvas renderiza corretamente
- [ ] Input é capturado
- [ ] Sem erros no console

---

## 🎮 Fase 2: Personagem e Combate

### Objetivos
- [ ] Criar classe Player
- [ ] Implementar movimento (WASD)
- [ ] Implementar salto
- [ ] Sistema de ataque
- [ ] Barra de vida
- [ ] Sistema de dano

### Arquivos a Criar
```
client/src/game/
├── entities/
│   ├── Entity.ts
│   └── Player.ts
├── systems/
│   └── CombatSystem.ts
└── data/
    └── player.json
```

### Tarefas Específicas
1. **Entity.ts** (Classe Base)
   - Posição (x, y)
   - Velocidade (vx, vy)
   - Dimensões (width, height)
   - Vida (hp, maxHp)
   - Métodos: update(), draw(), takeDamage()

2. **Player.ts**
   - Herda de Entity
   - Movimento com aceleração
   - Salto com gravidade
   - Ataque com cooldown
   - Animação de movimento

3. **CombatSystem.ts**
   - Cálculo de dano
   - Crítico (20% chance)
   - Knockback
   - Morte

### Checklist de Conclusão
- [ ] Personagem aparece na tela
- [ ] Movimento com WASD funciona
- [ ] Salto funciona com gravidade
- [ ] Ataque funciona com cooldown
- [ ] Barra de vida é visível
- [ ] Personagem morre ao atingir 0 HP

---

## 👹 Fase 3: Inimigos e IA

### Objetivos
- [ ] Criar classe Enemy
- [ ] Implementar Monstro de Pedra
- [ ] Sistema de IA simples
- [ ] Patrulha e perseguição
- [ ] Ataque de inimigos
- [ ] Drop de itens

### Arquivos a Criar
```
client/src/game/
├── entities/
│   ├── Enemy.ts
│   └── EnemyStone.ts
├── systems/
│   └── AISystem.ts
└── data/
    └── enemies.json
```

### Tarefas Específicas
1. **Enemy.ts** (Classe Base)
   - Herda de Entity
   - Patrulha em área
   - Detecção de jogador
   - Ataque
   - Morte com efeito

2. **EnemyStone.ts** (Inimigo Específico)
   - Stats: HP 30, Ataque 5, Defesa 2
   - Sprite de pedra
   - Velocidade lenta
   - Padrão de patrulha

3. **AISystem.ts**
   - Máquina de estados (Idle, Patrulha, Perseguição, Ataque)
   - Raio de detecção
   - Pathfinding simples
   - Decisão de ataque

### Checklist de Conclusão
- [ ] Inimigos aparecem no mapa
- [ ] Patrulham corretamente
- [ ] Perseguem o jogador
- [ ] Atacam quando em alcance
- [ ] Morrem e desaparecem
- [ ] Dropam itens

---

## 🗺️ Fase 4: Mapas e Exploração

### Objetivos
- [ ] Criar sistema de mapas
- [ ] Implementar Mapa da Floresta
- [ ] Implementar Mapa das Ruínas
- [ ] Implementar Mapa do Templo
- [ ] Transição entre mapas
- [ ] Minimapa

### Arquivos a Criar
```
client/src/game/
├── maps/
│   ├── Map.ts
│   ├── MapForest.ts
│   ├── MapRuins.ts
│   ├── MapTemple.ts
│   ├── TileMap.ts
│   └── MapGenerator.ts
├── assets/
│   ├── tilesets/
│   └── sprites/
└── data/
    └── maps.json
```

### Tarefas Específicas
1. **Map.ts** (Classe Base)
   - Dimensões do mapa
   - Lista de entidades
   - Spawn points
   - Pontos de saída

2. **TileMap.ts**
   - Renderização de tiles
   - Colisão com tiles
   - Camadas (fundo, meio, frente)

3. **Mapas Específicos**
   - Floresta: 800x600, 5 inimigos
   - Ruínas: 1000x800, 10 inimigos
   - Templo: 1200x1000, Boss final

4. **Transição**
   - Detecção de saída
   - Fade in/out
   - Carregamento do novo mapa

### Checklist de Conclusão
- [ ] Mapas são renderizados
- [ ] Personagem pode explorar
- [ ] Colisão com tiles funciona
- [ ] Transição entre mapas funciona
- [ ] Minimapa é visível

---

## 📊 Fase 5: Sistema RPG

### Objetivos
- [ ] Sistema de XP e níveis
- [ ] Stats do personagem
- [ ] Inventário
- [ ] Sistema de missões
- [ ] Árvore de habilidades
- [ ] Sistema de save

### Arquivos a Criar
```
client/src/game/
├── systems/
│   ├── RPGSystem.ts
│   ├── InventorySystem.ts
│   ├── QuestSystem.ts
│   └── SaveSystem.ts
└── data/
    ├── items.json
    ├── quests.json
    └── skills.json
```

### Tarefas Específicas
1. **RPGSystem.ts**
   - Cálculo de XP
   - Level up
   - Distribuição de stats
   - Progressão de habilidades

2. **InventorySystem.ts**
   - Armazenamento de itens
   - Limite de espaço
   - Equipamento
   - Uso de itens

3. **QuestSystem.ts**
   - Registro de missões
   - Objetivos
   - Recompensas
   - Progresso

4. **SaveSystem.ts**
   - Serialização de estado
   - LocalStorage
   - Múltiplos slots
   - Auto-save

### Checklist de Conclusão
- [ ] XP é ganho ao derrotar inimigos
- [ ] Level up funciona
- [ ] Stats aumentam
- [ ] Inventário funciona
- [ ] Missões podem ser rastreadas
- [ ] Save/Load funciona

---

## 🎨 Fase 6: Interface e HUD

### Objetivos
- [ ] HUD principal (vida, XP, ouro)
- [ ] Menu principal
- [ ] Menu de pausa
- [ ] Interface de inventário
- [ ] Log de missões
- [ ] Árvore de habilidades

### Arquivos a Criar
```
client/src/game/ui/
├── HUD.ts
├── Menu.ts
├── PauseMenu.ts
├── InventoryUI.ts
├── QuestLog.ts
├── SkillTree.ts
└── UIManager.ts
```

### Tarefas Específicas
1. **HUD.ts**
   - Barra de vida
   - Barra de XP
   - Contador de ouro
   - Minimapa
   - Nível atual

2. **Menu.ts**
   - Botão Iniciar
   - Botão Carregar
   - Botão Opções
   - Botão Sair

3. **PauseMenu.ts**
   - Continuar
   - Inventário
   - Missões
   - Opções
   - Sair para Menu

4. **InventoryUI.ts**
   - Grade de itens
   - Descrição de itens
   - Equipamento
   - Venda de itens

### Checklist de Conclusão
- [ ] HUD é visível
- [ ] Menu principal funciona
- [ ] Pausa funciona
- [ ] Inventário é acessível
- [ ] Missões são rastreáveis
- [ ] Árvore de habilidades é visível

---

## 🔊 Fase 7: Audio e Efeitos

### Objetivos
- [ ] Sistema de som
- [ ] Música de fundo
- [ ] Efeitos sonoros
- [ ] Sistema de partículas
- [ ] Efeitos visuais

### Arquivos a Criar
```
client/src/game/
├── systems/
│   ├── AudioSystem.ts
│   └── ParticleSystem.ts
└── assets/
    ├── audio/
    │   ├── music/
    │   └── sfx/
    └── particles/
```

### Tarefas Específicas
1. **AudioSystem.ts**
   - Reprodução de música
   - Efeitos sonoros
   - Volume
   - Mute/Unmute

2. **ParticleSystem.ts**
   - Efeitos de dano
   - Efeitos de morte
   - Efeitos de ataque
   - Efeitos de cura

### Checklist de Conclusão
- [ ] Música toca no menu
- [ ] Efeitos sonoros funcionam
- [ ] Partículas aparecem
- [ ] Volume pode ser ajustado

---

## 🎯 Fase 8: Polimento e Testes

### Objetivos
- [ ] Balanceamento de dificuldade
- [ ] Otimização de performance
- [ ] Testes de compatibilidade
- [ ] Correção de bugs
- [ ] Documentação final

### Tarefas Específicas
1. **Balanceamento**
   - Ajustar dano de inimigos
   - Ajustar XP
   - Ajustar dificuldade

2. **Performance**
   - Profiling
   - Otimização de renderização
   - Redução de memory leaks

3. **Testes**
   - Testes em diferentes navegadores
   - Testes em diferentes resoluções
   - Testes de gameplay

4. **Documentação**
   - README
   - Guia de controles
   - Guia de desenvolvimento

### Checklist de Conclusão
- [ ] Jogo é divertido
- [ ] Sem bugs críticos
- [ ] Performance é boa
- [ ] Documentação está completa

---

## 🚀 Recursos Adicionais para Impressionar Recrutadores

### Implementações Avançadas
- [ ] **IA Adaptativa**: Inimigos que aprendem com o tempo
- [ ] **Geração Procedural**: Mapas gerados aleatoriamente
- [ ] **Multiplayer Local**: 2 jogadores na mesma tela
- [ ] **Painel Web**: Estatísticas dos jogadores
- [ ] **CI/CD**: GitHub Actions para builds automáticas

### Métricas de Qualidade
- [ ] TypeScript com 100% de type coverage
- [ ] Testes unitários (>80% coverage)
- [ ] Documentação de código
- [ ] Performance > 60 FPS
- [ ] Sem memory leaks

---

## 📝 Notas Importantes

### Prioridades
1. **Gameplay funcional** antes de polimento
2. **Estabilidade** antes de features extras
3. **Performance** antes de gráficos bonitos

### Decisões Técnicas
- Canvas 2D em vez de WebGL (mais simples)
- TypeScript para type safety
- React para UI (não para game loop)
- LocalStorage para save (não backend)

### Próximos Passos
1. Começar com Fase 1 (Motor Base)
2. Testar cada fase antes de prosseguir
3. Manter código limpo e documentado
4. Fazer commits frequentes no GitHub

---

## 📞 Suporte e Debugging

### Ferramentas de Debug
- Browser DevTools (Console, Performance)
- Logger customizado
- Modo debug visual (hitboxes)

### Recursos
- MDN Web Docs (Canvas API)
- TypeScript Handbook
- React Documentation
- Game Development Patterns

---

**Última Atualização**: 12 de Junho de 2026
**Responsável**: Fernando Lukoki

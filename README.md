# Fernando Lukoki: Luta e Aventura

Um jogo RPG de ação 2D desenvolvido em HTML5 e JavaScript, apresentando um sistema de combate dinâmico, progressão de personagem e exploração de múltiplos mapas.

![Fernando Lukoki: Luta e Aventura](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/Licença-MIT-green)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue)

## 🎮 Visão Geral

**Fernando Lukoki: Luta e Aventura** é um jogo de ação e aventura em 2D que coloca o jogador no papel de um guerreiro em busca de glória. Embarque em uma jornada épica através de florestas misteriosas, ruínas antigas e templos sagrados, enfrentando inimigos poderosos e progressando através de um sistema RPG completo.

O jogo foi desenvolvido utilizando tecnologias web modernas, oferecendo uma experiência fluida com 60 FPS, sistema de combate responsivo e mecânicas de RPG profundas.

## ✨ Funcionalidades Principais

### Sistema de Combate
O jogo apresenta um sistema de combate corpo a corpo dinâmico com as seguintes características:

- **Ataque Corpo a Corpo**: Clique do mouse para atacar inimigos próximos
- **Dano Crítico**: 20% de chance de dano crítico com multiplicador 1.5x
- **Knockback**: Empurrão ao acertar inimigos para criar espaço
- **Cooldown de Ataque**: Sistema de cooldown para balanceamento
- **Defesa**: Redução de dano baseada em stats de defesa

### Progressão RPG
Um sistema completo de progressão que recompensa o jogador por suas vitórias:

- **Experiência (XP)**: Ganho ao derrotar inimigos com curva exponencial
- **Níveis**: Progressão de personagem com aumento de stats
- **Stats**: Força (ataque), Defesa (redução de dano), Vitalidade (HP)
- **Ouro**: Moeda coletada ao derrotar inimigos
- **Inventário**: Sistema de 20 slots para armazenamento de itens

### Exploração de Mapas
Três mapas distintos com ambientes únicos e desafios progressivos:

- **Floresta Misteriosa**: Primeiro mapa com inimigos básicos
- **Ruínas Antigas**: Segundo mapa com desafios intermediários
- **Templo Sagrado**: Terceiro mapa com o confronto final

### Sistema de IA
Inimigos inteligentes com comportamento adaptativo:

- **Patrulha**: Movimento automático em área definida
- **Detecção**: Raio de visão de 200px para detectar o jogador
- **Perseguição**: Seguir o jogador quando detectado
- **Ataque**: Ataque automático quando em alcance
- **Máquina de Estados**: Transição suave entre estados (Patrulha, Perseguição, Ataque)

### Interface de Jogo
HUD completo com informações em tempo real:

- **Barra de Vida**: Visualização de HP com cores dinâmicas
- **Barra de XP**: Progresso para o próximo nível
- **Stats**: Exibição de nível, ouro, força e defesa
- **Nível de Ameaça**: Indicador visual de perigo (Seguro, Aviso, Perigo)
- **Minimapa**: Visualização dos arredores com posição do jogador e inimigos

### Sistemas Avançados
Implementações que elevam a qualidade do jogo:

- **Sistema de Partículas**: Efeitos visuais para dano, morte, ataque e cura
- **Sistema de Áudio**: Suporte para música de fundo e efeitos sonoros
- **Sistema de Missões**: 3 missões principais com objetivos e recompensas
- **Sistema de Save/Load**: Salvamento em LocalStorage com múltiplos slots
- **Logging Estruturado**: Sistema de logging para debugging

## 🎯 Controles

| Ação | Controle |
|------|----------|
| Mover Esquerda | A ou Seta Esquerda |
| Mover Direita | D ou Seta Direita |
| Saltar | Espaço |
| Atacar | Clique do Mouse |
| Pausar | ESC |
| Menu | P |

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

- **Frontend**: React 19 + TypeScript
- **Renderização**: HTML5 Canvas 2D
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS 4
- **Física**: Sistema de colisão AABB customizado
- **Armazenamento**: LocalStorage para saves

## 📊 Arquitetura do Projeto

A estrutura do projeto segue uma arquitetura modular e escalável:

```
client/src/game/
├── core/                    # Motor do jogo
│   ├── GameEngine.ts        # Loop principal
│   ├── Renderer.ts          # Renderização Canvas
│   ├── InputHandler.ts      # Entrada de usuário
│   ├── Physics.ts           # Sistema de física
│   └── GameState.ts         # Estado global
├── entities/                # Entidades do jogo
│   ├── Entity.ts            # Classe base
│   ├── Player.ts            # Personagem jogável
│   ├── Enemy.ts             # Classe base de inimigos
│   └── EnemyStone.ts        # Inimigo específico
├── systems/                 # Sistemas de jogo
│   ├── CombatSystem.ts      # Combate
│   ├── RPGSystem.ts         # Progressão RPG
│   ├── AISystem.ts          # IA dos inimigos
│   ├── InventorySystem.ts   # Inventário
│   ├── QuestSystem.ts       # Missões
│   ├── AudioSystem.ts       # Áudio
│   └── ParticleSystem.ts    # Partículas
├── maps/                    # Mapas do jogo
│   ├── Map.ts               # Classe base
│   ├── MapForest.ts         # Floresta
│   ├── MapRuins.ts          # Ruínas
│   ├── MapTemple.ts         # Templo
│   └── MapManager.ts        # Gerenciador
├── ui/                      # Interface
│   └── HUD.ts               # Interface de jogo
├── constants/               # Configurações
│   ├── GameConfig.ts        # Configurações principais
│   └── Enums.ts             # Enumerações
└── utils/                   # Utilitários
    ├── MathUtils.ts         # Funções matemáticas
    ├── Logger.ts            # Logging
    └── SaveSystem.ts        # Sistema de save
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm como gerenciador de pacotes

### Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/fernandolukoki94-beep/luko-social.git
cd Fernando-Lukoki-Adventure
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

4. Abra o navegador em `http://localhost:3000`

### Build para Produção

```bash
pnpm build
```

O build será gerado na pasta `dist/`.

## 📈 Progressão do Jogo

### Curva de Experiência
A experiência necessária para cada nível segue uma progressão exponencial:

```
XP para nível N = 100 * (1.2)^(N-1)
```

Isso cria uma curva de dificuldade que aumenta gradualmente, mantendo o jogo desafiador conforme o jogador progride.

### Aumento de Stats por Nível
Ao subir de nível, o jogador recebe os seguintes aumentos:

| Stat | Aumento por Nível |
|------|-------------------|
| Força | +2 |
| Defesa | +1 |
| Velocidade | +0.5 |
| Vitalidade | +5 HP |

## 🎨 Design Visual

O jogo utiliza um estilo visual pixel art 2D com uma paleta de cores temática:

- **Floresta**: Tons de verde (#1a4d0e, #2d5016)
- **Ruínas**: Tons de cinza (#4a4a4a, #6b6b6b)
- **Templo**: Tons de dourado (#3d3d1f, #d4af37)

A interface utiliza cores contrastantes para máxima legibilidade, com barras de vida em verde/amarelo/vermelho baseadas no percentual de HP.

## 🔄 Ciclo de Atualização

O motor do jogo executa em 60 FPS com o seguinte ciclo:

1. **Input**: Captura entrada do teclado e mouse
2. **Update**: Atualiza posição, colisão, IA e combate
3. **Render**: Desenha tudo no Canvas
4. **Audio**: Reproduz sons

Cada frame leva aproximadamente 16.67ms para manter a fluidez.

## 🐛 Debugging

O jogo inclui um modo debug que pode ser ativado em `GameConfig.ts`:

```typescript
DEBUG: {
  ENABLED: true,
  SHOW_HITBOXES: true,
  SHOW_GRID: true,
  SHOW_FPS: true,
}
```

Quando ativado, exibe hitboxes das entidades, grid do mapa e contador de FPS.

## 📝 Missões

O jogo inclui 3 missões principais que guiam o jogador através da aventura:

| Missão | Objetivo | Recompensa |
|--------|----------|-----------|
| Os Primeiros Passos | Derrotar 5 monstros de pedra | 200 XP, 100 ouro |
| Explorador das Ruínas | Alcançar o final das ruínas | 300 XP, 150 ouro |
| O Confronto Final | Derrotar o boss final | 500 XP, 300 ouro |

## 🎓 Aprendizados e Técnicas

Este projeto demonstra conhecimento em várias áreas:

### Programação de Jogos
- Arquitetura de motor de jogo modular
- Loop de jogo com timing consistente
- Máquina de estados para comportamento de IA
- Sistemas de partículas para efeitos visuais

### Algoritmos
- Detecção de colisão AABB
- Pathfinding simples com cálculo de distância
- Curva exponencial para progressão
- Máquina de estados para IA

### Otimização
- Object pooling para partículas
- Culling de entidades fora da câmera
- Canvas double-buffering
- Gerenciamento eficiente de memória

### Boas Práticas
- TypeScript para type safety
- Separação clara de responsabilidades
- Documentação inline completa
- Sistema de logging estruturado

## 🔮 Melhorias Futuras

Potenciais expansões do projeto:

- **Mais Inimigos**: Adicionar novos tipos com comportamentos únicos
- **Boss Fights**: Implementar chefes com padrões de ataque complexos
- **Sistema de Habilidades**: Árvore de habilidades desbloqueáveis
- **Multiplayer Local**: Modo cooperativo para 2 jogadores
- **Achievements**: Sistema de conquistas e estatísticas
- **Leaderboard Online**: Ranking global de jogadores
- **Geração Procedural**: Mapas gerados aleatoriamente
- **Editor de Mapas**: Ferramenta para criar novos mapas

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Fernando Lukoki** - Desenvolvedor

- GitHub: [@fernandolukoki94-beep](https://github.com/fernandolukoki94-beep)
- Email: fernando.lukoki@example.com

## 🙏 Agradecimentos

Este projeto foi desenvolvido como demonstração de habilidades em desenvolvimento de jogos web, programação de IA e arquitetura de software.

## 📞 Suporte

Para reportar bugs, sugerir features ou fazer perguntas, abra uma issue no repositório GitHub.

---

**Desenvolvido com ❤️ em 2026**

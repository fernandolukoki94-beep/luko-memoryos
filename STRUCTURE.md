# Estrutura da aplicação integrada

| Camada | Responsabilidade |
|---|---|
| `client/src/App.tsx` | Casca da aplicação, navegação principal e áreas activas. |
| `client/src/pages/IntegratedHome.tsx` | Hub de Memórias, Bora Uzima Studio e Arcade Retro. |
| `client/src/components/memories/*` | Captura e apresentação de memórias locais e Memórias Sonoras. |
| `client/src/components/studio/*` | Gravador local, teclado, pads e exportação/associação de áudio. |
| `client/src/components/arcade/*` | Selector, estado de pontuação e jogos retro isolados. |
| `client/src/lib/local-vault.ts` | Modelo local de memória e armazenamento namespaced; sem palavras-passe. |
| `client/src/lib/arcade-scores.ts` | Pontuação local por jogo; nenhum perfil ou leaderboard remoto. |

## Limites de dados

| Dados | Onde vivem | Não permitido |
|---|---|---|
| Memórias | `localStorage` namespaced do navegador, com mensagem clara de que são locais. | Alegar sincronização, backup ou cifragem de ponta a ponta. |
| Takes de Studio | URL de objecto enquanto a sessão estiver aberta; metadados de Memória Sonora podem ser guardados localmente. | Upload automático de áudio. |
| Jogos | Pontuações locais sem conta. | Misturar com memórias privadas ou enviar telemetria. |

## Decisão de integração

O Studio fica dentro da aplicação como experiência compacta e local-first. A produção avançada continua disponível na Bora Uzima Studio dedicada; a área integrada cria o caminho “produzir som → guardar uma Memória Sonora” sem acoplar bases de dados nem autenticação.


# Plano de entrega — Lucu Memories integrado

## Direcção do produto

O produto passa a ter três áreas visíveis e independentes: **Memórias**, para registos pessoais locais; **Bora Uzima Studio**, para criar áudio localmente; e **Arcade Retro**, para pausas de jogo sem recolha de dados. A área REX deixa de competir com este percurso de consumidor e não aparece na navegação principal.

## Riscos de implementação

### Jogos com temporizador e teclado

- **Porque é isolado:** Snake, Pong, Breakout e Space Invaders possuem loops temporizados que podem duplicar em React se os intervals não forem limpos.
- **Abordagem:** cada jogo recebe o seu próprio componente, estado explícito de `idle`, `playing` e `game-over`, cleanup de interval e controlos tácteis além do teclado.
- **Verificação:** iniciar, pausar/reiniciar e trocar de jogo não cria movimentos duplicados; a pontuação só aumenta quando há uma acção válida.

### Áudio local no browser

- **Porque é isolado:** permissões de microfone e áudio exigem gesto explícito do utilizador e não devem bloquear a navegação.
- **Abordagem:** a área Studio pede microfone apenas depois do toque em gravar; instrumentos e pads usam Web Audio depois de uma acção do utilizador; o ficheiro criado pode ser anexado a uma memória local.
- **Verificação:** negar a permissão mostra uma mensagem honesta; gravar, parar e ouvir uma take não envia áudio para um servidor.

## Construção principal

- Criar navegação clara entre Memórias, Studio e Arcade.
- Converter memórias para modelo local honesto com texto, data, humor, privacidade e anexo sonoro opcional.
- Implementar Studio compacto com gravador local, piano, pads e ligação directa “Guardar como Memória Sonora”.
- Implementar Snake, Pong, Breakout, Space Invaders e Memory Flip com controlos por teclado e toque.
- Guardar apenas pontuações e preferências localmente sob chaves próprias do Arcade.

## Critérios de verificação

- Cada área abre por navegação explícita e regressa sem perder o estado local.
- Cada jogo tem instruções, iniciar/reiniciar, pontuação e um ciclo jogável visível.
- O Studio tem acções reais, não botões mortos.
- Uma take ou título de faixa pode entrar numa Memória Sonora sem login nem upload.
- O build e TypeScript passam; nenhuma promessa de cifragem, IA ou sincronização é apresentada sem implementação.


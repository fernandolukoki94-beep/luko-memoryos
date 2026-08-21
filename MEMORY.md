# Memória de implementação

- O repositório original mistura MemoryOS, REX e jogo de acção; a experiência integrada vai esconder esta mistura da navegação principal.
- O frontend original guardava contas, palavras-passe e memórias no `localStorage`. A nova experiência não deve reproduzir o login local inseguro nem chamar os dados de cofre cifrado.
- A referência visual do Arcade foi gerada para orientar paleta, densidade e composição. O Arcade será implementado como jogos 2D de browser com controles reais, não como uma imagem estática.
- O build original passou com um chunk principal acima de 500 kB; as áreas de Arcade e Studio devem ser carregadas de forma organizada para não agravar a página inicial.
- Verificação visual no browser: a nova landing renderiza com navegação, hero das três áreas, arquivo vazio, Studio e selector do Arcade. O estado de dados locais aparece explicitamente ao utilizador.
- Verificação de interacção: o modal Nova memória abre com título, história, humor e privacidade; o console não reportou erro de runtime durante esta abertura.
- Teste de persistência local: uma memória de teste foi guardada com sucesso, passou a aparecer como cartão privado e actualizou o contador de arquivo para uma memória.
- Verificação visual do Arcade: o selector mostra Snake, Pong, Breakout, Orbit Invaders e Memory Flip; Snake apresenta grelha, cobra, alimento, pontuação e controlos próprios.
- Verificação de jogo: Pong carregou como jogo separado, mostrou arena e controlos de raquete, atribuiu pontuação e guardou a melhor marca local depois do fim da ronda.
- Publicação de pré-visualização: o commit `6790c54c` foi ligado à Vercel e a URL remota carregou com título, navegação e as três áreas integradas correctas.

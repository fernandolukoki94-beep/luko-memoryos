# Auditoria REX e revisão profissional de Fernando Lucoco

## Síntese executiva

O REX tem futuro como **prova de engenharia offline-first para operações mineiras**, sobretudo como demonstração técnica e porta de entrada para conversas com equipas de operações, manutenção e infraestrutura. A proposta é forte porque começa por uma dor concreta: registar e preservar eventos em campo quando a conectividade é intermitente. O produto deve continuar deliberadamente estreito; tentar transformá-lo já num ERP, CMMS, sistema de IoT completo ou plataforma de previsão de falhas reduziria a credibilidade e aumentaria o risco técnico.

A versão actual está tecnicamente saudável: `pnpm check` e `pnpm build` passam. O build, contudo, emite um aviso não bloqueante de bundle principal acima de 500 kB. A implementação usa `localStorage`, timers locais e telemetria sintética; isso é apropriado para uma demonstração, mas deve continuar claramente identificado como simulação até existir backend, autenticação, persistência durável e integração autorizada com sensores.

## Bugs e riscos técnicos identificados

| Área | Observação | Prioridade | Tratamento recomendado |
|---|---|---:|---|
| Sincronização | O fluxo usa `setTimeout` sem cancelamento; uma desmontagem ou nova sincronização pode deixar actualizações tardias. | Média | Guardar os timers e limpar no desmontar; bloquear reentrada. |
| Falhas | O estado `failed` existe no tipo e na interface, mas a demo não possui uma simulação explícita de falha e recuperação. | Média | Adicionar um modo controlado de falha, sem fingir que é uma falha de rede real. |
| Persistência | `localStorage` é suficiente para a demo, mas não para dados operacionais reais ou anexos. | Alta para piloto | Evoluir para IndexedDB/SQLite edge antes de qualquer piloto. |
| Telemetria | Os valores são fixos apesar do texto dizer “actualização em tempo real”. | Média | Renomear para “snapshot sintético” ou adicionar uma variação controlada e rotulada. |
| Acessibilidade | Botões de fechar e controlos de conectividade precisam de `aria-label`; o modal não declara diálogo nem gestão de foco. | Média | Adicionar rótulos, `role=dialog`, `aria-modal` e foco previsível. |
| Integridade | O fingerprint SHA-256 é útil para detectar alterações, mas não é assinatura nem prova de autenticidade. | Alta de comunicação | Manter a formulação honesta já adoptada. |
| Identidade | A página actual ainda não apresenta claramente o autor. | Alta para portfólio | Introduzir autoria visível: “Construído por Fernando Lucoco”. |
| Marca pessoal | O CV fornecido usa “Fernando Lukoki”, enquanto o pedido do projecto usa “Fernando Lucoco”. | Alta | Confirmar a grafia legal/profissional antes de publicar um CV final ou alterar identidade em massa. |

## Avaliação do produto

A primeira versão deve vender uma capacidade específica: **“um operador consegue criar um evento operacional sem rede, preservar a evidência local e sincronizar de modo observável quando a conectividade regressa.”** Esta frase é mais credível do que prometer inteligência artificial, manutenção preditiva ou integração industrial completa.

O próximo marco técnico de maior valor é um teste demonstrável de dez eventos: criar dez eventos offline, fechar e reabrir a aplicação, confirmar que permanecem na fila, restaurar conectividade, sincronizar exactamente dez vezes e mostrar idempotência. Esse marco provaria mais maturidade do que adicionar muitos ecrãs.

## Revisão do CV

O CV é limpo, legível e directo, mas actualmente está subaproveitado. O título mistura backend, Python, infraestrutura, redes e cibersegurança sem indicar uma especialidade principal. A secção de projectos enumera nomes sem explicar problema, tecnologia, resultado ou link. “Adicionar link do perfil GitHub” é um marcador incompleto e deve ser substituído por um URL real. Também faltam contactos profissionais, resumo de impacto, experiência quantificada e uma secção curta de projectos seleccionados.

A melhoria recomendada é posicionar Fernando como **desenvolvedor backend Python com foco em sistemas operacionais resilientes, APIs e infraestrutura**, usando o REX como projecto principal. Não devem ser inventadas empresas, cargos, datas, certificações ou métricas; os dados em falta devem ser confirmados pelo autor.

## Plano de evolução

| Fase | Resultado | Critério de conclusão |
|---|---|---|
| Fundação | Identidade, README, CV e demo coerentes | Nome, links e limites confirmados |
| Robustez v1.1 | Dez eventos offline, reload e sync idempotente | Teste automatizado e demo 10/10 |
| Backend v1.2 | API real, persistência durável e autenticação mínima | Contratos HTTP testados |
| Edge v2 | Agente local e fila SQLite/IndexedDB | Operação sem rede por período prolongado |
| Piloto | Um caso de uso com dados autorizados | Critérios de segurança, suporte e operação definidos |

## Conectores sociais

Foi encontrada uma integração Instagram desactivada e uma integração Taplio/LinkedIn desactivada. Não foi encontrado conector Facebook. A existência de um conector não significa que a conta esteja autenticada ou que possa publicar em perfil, página, story ou reel. Qualquer activação deve ser feita apenas com autorização explícita e cada publicação deve receber confirmação imediata antes de ser enviada.

## Conclusão

O projecto é bom, visualmente forte e tecnicamente promissor como portfólio. A maior melhoria necessária não é “mais funcionalidades”; é transformar a demo numa prova repetível, com identidade pessoal clara, documentação precisa e uma narrativa profissional que ligue o trabalho de Fernando Lucoco a uma dor operacional real.

> **Recomendação:** continuar com REX, mas apresentá-lo como um MVP de engenharia e não como um produto industrial já validado em mina real.

*Documento de trabalho preparado para revisão do autor.*

## Referências

As referências técnicas e de mercado usadas no enquadramento do REX estão documentadas em [`docs/research-notes.md`](research-notes.md). O presente documento não acrescenta dados externos não verificados.

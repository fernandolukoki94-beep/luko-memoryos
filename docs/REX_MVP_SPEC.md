# REX Mine Intelligence — Especificação do MVP v1

## Promessa do produto

> Mesmo sem conectividade, um operador consegue registar um evento operacional; quando a ligação regressa, o REX sincroniza o evento e mantém a sua rastreabilidade.

O REX é uma **camada operacional offline-first** para transformar observações de campo em eventos estruturados, sincronizados e accionáveis. Não pretende substituir ERP, CMMS, sistemas de sensores ou plataformas de rastreabilidade mineral.

## Fluxo vertical demonstrável

`CAMPO → REGISTRO LOCAL → FILA OFFLINE → SYNC ENGINE → REX OPERATIONS → INCIDENTE / TELEMETRIA / ALERTA / HISTÓRICO`

Cada etapa deve ser visível durante a demonstração. O fluxo actual funciona localmente no navegador e usa armazenamento local e sincronização simulada. Não há ainda um servidor industrial.

## Evento operacional

Cada evento deve conservar, no mínimo, os seguintes metadados:

| Campo | Função | Estado no MVP |
|---|---|---|
| `eventId` | Identificador legível, por exemplo `REX-EVT-2026-000184` | Implementado |
| `deviceId` | Origem do dispositivo de campo | Implementado como `field-device-07` |
| `userId` | Utilizador que registou o evento | Reservado para autenticação futura |
| `createdAtISO` | Timestamp do dispositivo | Implementado |
| `location` | Área operacional | Implementado como `area` |
| `payload` | Descrição e classificação do incidente | Implementado |
| `integrityHash` | Verificação de integridade demonstrável | Implementado |
| `syncStatus` | `pending`, `syncing`, `synced` ou `failed` | Implementado |
| `history` | Cadeia de eventos de criação, armazenamento e sincronização | Implementado |

## Motor de sincronização

Quando existe fila pendente, o painel apresenta as etapas: eventos encontrados, eventos validados, eventos enviados, eventos confirmados e eventos pendentes. A sincronização actual é uma simulação local honesta; numa fase posterior deverá incluir deduplicação, ordenação, resolução de conflitos e persistência num backend autorizado.

## Telemetria sintética

A Bomba 17 é um equipamento de demonstração. Os dados são fictícios e devem ser apresentados como `Synthetic telemetry — demonstration only`. O dashboard pode mostrar vibração, temperatura e pressão, mas não deve alegar previsão de falhas reais nem probabilidade clínica ou industrial sem dados autorizados.

## Critérios de aceitação

O MVP é aceite quando um utilizador consegue alternar para offline, criar um incidente, obter um Event ID, ver o registo como pendente, fechar e reabrir a aplicação sem o perder, consultar a Evidence Chain, restaurar a conectividade, executar a sincronização e ver o evento como sincronizado com zero pendências. O fluxo deve funcionar em ecrã pequeno e no desktop.

## Próximas fases sem custos

A próxima melhoria técnica deverá extrair o repositório local para um módulo testável, migrar de `localStorage` para IndexedDB, adicionar testes automatizados de dez eventos offline com fecho e reabertura, e só depois ligar um backend gratuito de demonstração. Integrações reais com sensores, identidade corporativa, ERP/CMMS, Redis, PostgreSQL, Docker on-premises e cibersegurança industrial pertencem à fase de piloto autorizado.

## Posição comercial

A primeira abordagem deve ser feita a empresas de serviços mineiros ou industriais mais pequenas: feedback, piloto, métricas, referência e apenas depois contacto com grandes operadoras. O REX deve ser apresentado como uma prova técnica pequena que demonstra uma capacidade industrial relevante, não como um ERP mineiro completo.

## Referências públicas

[1]: https://www.nokia.com/blog/the-importance-of-connected-workers-in-mining-digitalization/ "Nokia — Connected workers in mining digitalization"
[2]: https://www.speedcast.com/newsroom/press-releases/2021/mining-company-katanga-awards-speedcast-with-multi-year-connectivity-contract-for-headquarters-and-major-mine-site/ "Speedcast — Katanga mining connectivity"
[3]: https://www.glencore.com/media-and-insights/news/kamoto-copper-company-spearheads-innovative-employee-engagement-solution "Glencore — KCC Umoja App"
[4]: https://african-miningweek.com/news/drcs-ceec-unveils-new-digital-mineral-traceability-platform "CEEC E-trace"
[5]: https://ijias.issr-journals.org/abstract.php?article=IJIAS-24-319-04 "Digital transformation challenges in Kolwezi"

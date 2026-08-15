# REX Mine Intelligence — Guia de demonstração v1

## Promessa

> Mesmo sem conectividade, um operador consegue registar um evento operacional; quando a ligação regressa, o REX sincroniza o evento e mantém a sua rastreabilidade.

Não prometer previsão de acidentes, controlo de máquinas, falhas reais ou substituição de ERP/CMMS. A telemetria é sintética e a sincronização desta versão é local.

## Preparação gratuita

Executar `pnpm install` e depois `pnpm dev --host 0.0.0.0`. Abrir `http://localhost:3000/rex`. A demonstração não precisa de Firebase, Vercel, API paga, sensores ou equipamento físico.

## Roteiro de dois minutos

| Tempo | Acção | Mensagem |
|---|---|---|
| 0:00–0:20 | Mostrar o Centro de Operações | O REX reúne incidentes, telemetria sintética, alertas e histórico. |
| 0:20–0:35 | Mostrar a Bomba 17 | O sistema detecta uma anomalia nos dados sintéticos; não afirma prever uma falha real. |
| 0:35–0:50 | Activar `Connectivity OFFLINE` | A conectividade é uma variável operacional simulada e o operador não fica bloqueado. |
| 0:50–1:10 | Registar incidente | O evento recebe Event ID, origem, hash, estado `Pendente` e cadeia de evidência local. |
| 1:10–1:25 | Mostrar `A sincronizar (1)` | O supervisor vê a fila que aguarda rede. |
| 1:25–1:45 | Activar `Connectivity ONLINE` e clicar `Sincronizar` | O Sync Engine mostra encontrados, validados, enviados, confirmados e pendentes. |
| 1:45–2:00 | Abrir o evento | A Evidence Chain mostra `EVENT CREATED`, `LOCAL STORAGE`, hash e estado sincronizado. |

## Mensagem comercial

> O REX é uma camada operacional offline-first para transformar observações de campo em eventos estruturados, sincronizados e accionáveis. Não tenta substituir o ERP ou o CMMS da empresa; começa por resolver uma parte concreta do fluxo e prepara integrações futuras.

## Teste de robustez recomendado

Com a versão seguinte, desligar a Internet simulada, registar dez eventos, fechar e reabrir a aplicação, confirmar que os dez permanecem no dispositivo, restaurar a ligação, clicar em `Synchronize` e verificar `10/10 synchronized successfully`. Este teste é o próximo marco de qualidade; não devemos adicionar funcionalidades maiores antes de o tornar confiável.

## Limitações

O armazenamento actual usa `localStorage`, a sincronização é simulada, o dispositivo é fictício, não há utilizador autenticado nem servidor industrial e o hash serve como demonstração de integridade, não como certificação de segurança. Um piloto real exigirá IndexedDB, backend, autenticação, controlo de acesso, retenção, auditoria, rede e validação de cibersegurança.

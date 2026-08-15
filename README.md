# REX Mine Intelligence

> **Offline-first operational intelligence for connected and disconnected field environments.**

O **REX Mine Intelligence** é uma prova técnica de engenharia para operações industriais onde a conectividade não pode ser presumida. O MVP demonstra que um operador consegue registar um evento no campo sem Internet, guardá-lo localmente, mantê-lo numa fila pendente e sincronizá-lo quando a ligação regressa, conservando uma cadeia de evidência visível.

O projecto nasceu sobre a base React/Vite do Luko MemoryOS e mantém as páginas originais. O Centro de Operações REX está disponível em `/rex`.

## Acesso visual

| Ambiente | Link | Estado |
|---|---|---|
| Demonstração local | `http://localhost:3000/rex` | Disponível após iniciar o projecto |
| Preview visual desta sessão | [Abrir demonstração REX](https://3000-i6xyex4j7lghvqeyw2pvg-42cb0cfd.us4.manus.computer/rex) | Link temporário; pode expirar quando a sessão terminar |
| GitHub | [fernandolukoki94-beep/luko-memoryos](https://github.com/fernandolukoki94-beep/luko-memoryos) | Código e documentação publicados |
| Vercel | A configurar | A conta autorizada devolveu HTTP 403 ao criar o primeiro deployment |

Quando o deployment Vercel tiver permissões válidas, este README será actualizado com o URL público verificável. Não é apresentado um link fictício.

## O fluxo v1

```text
FIELD DEVICE
     │ Connectivity OFFLINE
     ▼
OPERATIONAL EVENT
     │ local storage
     ▼
PENDING QUEUE
     │ Connectivity ONLINE
     ▼
SYNC ENGINE
     │ validate → send → acknowledgement
     ▼
REX OPERATIONS
     │ incident · telemetry · alert · history
     ▼
EVIDENCE CHAIN
```

O objecto central é o **Operational Event**. Cada evento pode conter Event ID, tipo, descrição, equipamento, área, dispositivo, operador de demonstração, timestamp, estado de conectividade, estado de sincronização, fingerprint de integridade e histórico de evidência.

## Demonstração de dois minutos

1. Abrir `/rex` e mostrar a Bomba 17 com telemetria sintética.
2. Activar `Connectivity OFFLINE`.
3. Registar um incidente e observar o Event ID, o estado `Pendente · local` e o contador da fila.
4. Abrir o evento para mostrar a Evidence Chain, o dispositivo, o operador e o integrity fingerprint.
5. Activar `Connectivity ONLINE` e clicar em `Sincronizar`.
6. Mostrar as etapas `encontrados → validados → enviados → confirmados → 0 pendentes`.
7. Reabrir o evento e mostrar `SYNCHRONIZED`.

A telemetria é sintética e a sincronização é uma simulação local. O hash é descrito como **integrity fingerprint / mecanismo de detecção de alteração**, não como prova de segurança absoluta.

## Arquitectura v1

| Camada | Implementação actual | Evolução posterior |
|---|---|---|
| REX Operations UI | React, TypeScript, Tailwind e Wouter | PWA de campo dedicada |
| Telemetry Simulator | Valores sintéticos para Bomba 17, Motor 04 e Linha 02 | Ingestão de sensores autorizados |
| Incidents Module | Registo de incidentes e estados operacionais | API e integração CMMS |
| Connectivity State | Simulador Online/Offline | Estado real de rede e edge gateway |
| Offline Store | `localStorage` compatível com a demo | IndexedDB ou SQLite edge |
| Pending Queue | Eventos `pending`, `syncing`, `synced` e `failed` | Fila durável e idempotente |
| Sync Engine | Validação, envio e acknowledgement simulados | Deduplicação, ordenação e resolução de conflitos |
| Evidence Chain | Timestamps e fingerprint de integridade | Assinatura criptográfica e auditoria autorizada |

## Escopo deliberadamente limitado

A versão v1 não inclui ERP, CMMS, pagamentos, utilizadores complexos, sensores reais, hardware, Firebase, IA conversacional, integração com máquinas, previsão de falhas ou múltiplos dashboards. O objectivo não é afirmar que foi construído um sistema de mineração completo; é provar uma capacidade de engenharia confiável em ambientes com conectividade intermitente.

## Execução local

É necessário Node.js 18 ou superior. Para iniciar:

```bash
git clone https://github.com/fernandolukoki94-beep/luko-memoryos.git
cd luko-memoryos
pnpm install
pnpm dev --host 0.0.0.0
```

Depois, abrir `http://localhost:3000/rex`. O MVP visual não requer API paga, Firebase, sensores, PostgreSQL, Redis ou credenciais corporativas.

## Verificações

```bash
pnpm check
pnpm build
python3 -m json.tool client/public/manifest.json
```

As verificações actuais passam. O build emite apenas um aviso não bloqueante sobre o tamanho do bundle principal acima de 500 kB.

## Documentação

| Documento | Conteúdo |
|---|---|
| [`docs/REX_MVP_SPEC.md`](docs/REX_MVP_SPEC.md) | Especificação funcional e arquitectura do MVP |
| [`docs/REX_DEMO_GUIDE.md`](docs/REX_DEMO_GUIDE.md) | Roteiro da demonstração de 120 segundos |
| [`docs/REX_AUDIT.md`](docs/REX_AUDIT.md) | Auditoria, testes, decisões e estado de publicação |
| [`docs/research-notes.md`](docs/research-notes.md) | Evidência pública usada para enquadrar a oportunidade |

## Evolução prevista

A evolução técnica é incremental: **v1 Offline Events**, **v2 Multi-device Synchronization**, **v3 Edge Telemetry**, **v4 Anomaly Detection** e **v5 Industrial Pilot**. Antes de procurar integrações reais, o próximo marco é tornar o teste de dez eventos offline, fecho/reabertura e sincronização `10/10` impossível de quebrar durante uma demonstração.

## Origem do repositório

O repositório mantém componentes do produto original **Luko MemoryOS**, uma aplicação React/Vite de memórias pessoais. O módulo REX foi isolado na rota `/rex` para permitir evolução independente sem apagar o trabalho existente.

## Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE) para mais informações.

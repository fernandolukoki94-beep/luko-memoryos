# REX Demo 10/10 — Validation Record

**Project:** REX Mine Intelligence  
**Author:** Fernando Lucoco  
**Date:** 15 August 2026  
**Scope:** Offline-first demonstration in the React/Vite Operations Centre.

## Acceptance criteria

The demonstration must create exactly ten offline operational events, persist them locally, reload the persisted queue to simulate closing and reopening the application, preserve ten unique Event IDs, and synchronise exactly ten events without duplicating or losing records.

## Implementation

The operation is started from the **Demo 10/10** control in `/rex`. It creates deterministic IDs from `REX-DEMO-10-01` through `REX-DEMO-10-10`, writes the events to `localStorage`, reads the persisted JSON again, calculates the number of recovered records and unique Event IDs, and then applies an idempotent acknowledgement to the ten demonstration events. The final state is visible in the validation panel and remains persisted for review.

This is a browser demonstration mechanism. It is not yet a production queue: the current store is `localStorage`, the telemetry is synthetic, and there is no multi-user server acknowledgement. The next implementation milestone is IndexedDB or SQLite Edge with durable retry and conflict handling.

## Verification result

| Criterion | Result |
|---|---:|
| Events persisted offline | 10 |
| Events recovered after simulated reopen | 10 |
| Unique Event IDs | 10 |
| Events synchronised | 10 |
| Duplicate demonstration IDs | 0 |
| Final phase | `synced` |

The result was read from the browser after the complete cycle and matched the stored `rex_demo_10_run_v1` record: `persisted=10`, `recovered=10`, `unique=10`, `synced=10`.

## Reproduction steps

1. Open the REX website and navigate to `/rex`.
2. Click **Demo 10/10**.
3. Wait for the panel to progress through persistence, recovery and synchronisation.
4. Confirm `10 guardados`, `10 recuperados`, `10 únicos` and `10 sync`.
5. Refresh the page and confirm that the validation result remains visible.

## Engineering note

The deterministic IDs make duplicate creation detectable and make the demonstration repeatable. This deliberately demonstrates the contract and user experience before replacing the browser store with a durable edge database.

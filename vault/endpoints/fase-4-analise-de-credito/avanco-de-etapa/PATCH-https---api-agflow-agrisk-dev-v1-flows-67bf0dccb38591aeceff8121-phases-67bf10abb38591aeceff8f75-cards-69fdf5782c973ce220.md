---
method: PATCH
url: "https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/phases/67bf10abb38591aeceff8f75/cards/69fdf5782c973ce220c44940"
status: 200
tags: [endpoint, agflow, avanco-de-etapa]
---

# PATCH https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/phases/67bf10abb38591aeceff8f75/cards/69fdf5782c973ce220c44940

## Observações

-
---

## Swagger

**Operação:** `FlowController_moveCard`

**Resumo:** Atualizar fase de uma oportunidade

**Descrição:** Rota responsável pela atualização da fase de uma oportunidade.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `id` | path | string | ✓ |  |
| `phaseId` | path | string | ✓ |  |
| `cardId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `phaseId` | string | ✓ |  |

### Response


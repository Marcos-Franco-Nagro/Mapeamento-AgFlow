---
method: PATCH
url: "https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/phases/67bf1082b38591aeceff8ee3/cards/69fe1d512c973ce220c49757"
status: 200
tags: [endpoint, agflow, avanco-de-etapa]
---

# PATCH https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/phases/67bf1082b38591aeceff8ee3/cards/69fe1d512c973ce220c49757

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


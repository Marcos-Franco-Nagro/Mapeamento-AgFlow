---
method: GET
url: "https://api.agflow.agrisk.dev/v1/group/69fdf5782c973ce220c44940/debt"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/group/69fdf5782c973ce220c44940/debt

## Features que consomem este endpoint

- [[fase4-agrisk-group-financial-debts]]

## Observações

-
---

## Swagger

**Operação:** `GroupController_findDebtGroup`

**Resumo:** Visualizar endividamentos

**Descrição:** Rota responsável pela visualização do endividamento no banco central (de forma agrupada).

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |

### Response — Debt Group


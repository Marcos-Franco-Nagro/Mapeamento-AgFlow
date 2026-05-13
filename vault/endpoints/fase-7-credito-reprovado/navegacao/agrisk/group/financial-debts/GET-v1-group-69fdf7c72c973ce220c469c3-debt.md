---
method: GET
url: "https://api.agflow.agrisk.dev/v1/group/69fdf7c72c973ce220c469c3/debt"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/group/69fdf7c72c973ce220c469c3/debt

## Features que consomem este endpoint

- [[fase7-agrisk-group-financial-debts]]

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


---
method: GET
url: "https://api.agflow.agrisk.dev/v1/group/69fe1d512c973ce220c49757/debt"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/group/69fe1d512c973ce220c49757/debt

## Features que consomem este endpoint

- [[fase3-agrisk-group-financial-debts]]

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


---
method: GET
url: "https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/credit-engine/policies/cards/69fdf6192c973ce220c45316/clients/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/credit-engine/policies/cards/69fdf6192c973ce220c45316/clients/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase5-credit-analysis-cash-flow-productions]]

## Observações

-
---

## Swagger

**Operação:** `FlowController_findAllCreditEngineOrderedPolicies`

**Resumo:** Buscar as politicas de crédito ordenadas de acordo com a execução do card e cliente

**Descrição:** Buscar as politicas de crédito ordenadas de acordo com a execução do card e cliente

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `flowId` | path | string | ✓ |  |
| `cardId` | path | string | ✓ |  |
| `clientId` | path | string | ✓ |  |

### Response — Find All Credit Engine Ordered Policies


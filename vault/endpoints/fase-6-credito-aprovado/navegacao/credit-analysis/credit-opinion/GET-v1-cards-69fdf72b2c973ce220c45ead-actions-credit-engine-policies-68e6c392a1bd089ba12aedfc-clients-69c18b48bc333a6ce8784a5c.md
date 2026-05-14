---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/69fdf72b2c973ce220c45ead/actions/credit-engine/policies/68e6c392a1bd089ba12aedfc/clients/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/cards/69fdf72b2c973ce220c45ead/actions/credit-engine/policies/68e6c392a1bd089ba12aedfc/clients/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase6-credit-analysis-credit-opinion]]

## Observações

-
---

## Swagger

**Operação:** `CardController_findCreditEngine`

**Resumo:** Visualizar motor de decisão

**Descrição:** Rota responsável pela visualização do motor de decisão.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `clientId` | path | string | ✓ |  |
| `policyId` | path | string | ✓ |  |

### Response — Find Credit Engine


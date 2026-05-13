---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/69fdf7c72c973ce220c469c3/actions/credit-engine/policies/68e6c392a1bd089ba12aedfc/clients/69c18b48bc333a6ce8784a5c/inputs"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/cards/69fdf7c72c973ce220c469c3/actions/credit-engine/policies/68e6c392a1bd089ba12aedfc/clients/69c18b48bc333a6ce8784a5c/inputs

## Features que consomem este endpoint

- [[fase7-agrisk-warehouse]]

## Observações

-
---

## Swagger

**Operação:** `CardController_findInputsCreditEngine`

**Resumo:** Visualizar parâmetros do motor de decisão

**Descrição:** Rota responsável pela visualização dos parâmetros do motor de decisão.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `clientId` | path | string | ✓ |  |
| `policyId` | path | string | ✓ |  |

### Response — Find Credit Engine Inputs


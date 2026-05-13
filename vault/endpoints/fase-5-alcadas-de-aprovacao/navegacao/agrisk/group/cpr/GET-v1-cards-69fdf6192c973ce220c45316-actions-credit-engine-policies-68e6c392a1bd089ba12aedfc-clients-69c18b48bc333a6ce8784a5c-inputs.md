---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cards/69fdf6192c973ce220c45316/actions/credit-engine/policies/68e6c392a1bd089ba12aedfc/clients/69c18b48bc333a6ce8784a5c/inputs"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/cards/69fdf6192c973ce220c45316/actions/credit-engine/policies/68e6c392a1bd089ba12aedfc/clients/69c18b48bc333a6ce8784a5c/inputs

## Features que consomem este endpoint

- [[fase5-agrisk-group-cpr]]

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


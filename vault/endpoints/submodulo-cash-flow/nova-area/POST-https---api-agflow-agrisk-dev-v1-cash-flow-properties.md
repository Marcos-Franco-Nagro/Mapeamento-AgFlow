---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cash-flow/properties"
status: 201
tags: [endpoint, agflow, cash-flow, nova-area]
---

# POST https://api.agflow.agrisk.dev/v1/cash-flow/properties

## Observações

-
---

## Swagger

**Operação:** `CashFlowController_createProperties`

**Resumo:** Cadastrar área

**Descrição:** Rota responsável pelo cadastro de uma área.

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `cardId` | string | ✓ |  |
| `flowId` | string | ✓ |  |
| `clientId` | string | ✓ |  |
| `name` | string | ✓ |  |
| `totalArea` | number | ✓ |  |
| `state` | string | ✓ |  |
| `city` | string | ✓ |  |
| `type` | string | ✓ |  |

### Response


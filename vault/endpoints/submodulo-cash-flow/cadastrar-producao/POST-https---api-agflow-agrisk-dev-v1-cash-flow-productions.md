---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cash-flow/productions"
status: 201
tags: [endpoint, agflow, cash-flow, cadastrar-producao]
---

# POST https://api.agflow.agrisk.dev/v1/cash-flow/productions

## Observações

-
---

## Swagger

**Operação:** `CashFlowController_createProduction`

**Resumo:** Cadastrar produção

**Descrição:** Rota responsável pelo cadastro de uma produção.

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `cardId` | string | ✓ |  |
| `flowId` | string | ✓ |  |
| `clientId` | string | ✓ |  |
| `items` | array | ✓ |  |

### Response


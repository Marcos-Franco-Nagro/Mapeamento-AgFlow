---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cards/68d1c611bf3c4749b1463898/actions/credit-engine/policies/68e6c392a1bd089ba12aedfc/clients/68bb359ceecd59426dda141a"
status: 201
tags: [endpoint, agflow, motor-credito]
---

# POST https://api.agflow.agrisk.dev/v1/cards/68d1c611bf3c4749b1463898/actions/credit-engine/policies/68e6c392a1bd089ba12aedfc/clients/68bb359ceecd59426dda141a

## Observações

-
---

## Swagger

**Operação:** `CardController_executeCreditEngine`

**Resumo:** Executar motor de decisão

**Descrição:** Rota responsável pela execução do motor de decisão.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `policyId` | path | string | ✓ |  |
| `clientId` | path | string | ✓ |  |

### Response — Execute Credite Engine by clientId


---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cards/69fe1d512c973ce220c49757/actions/decision-engine/clients/69c18b48bc333a6ce8784a5c"
status: unknown
tags: [endpoint, agflow, painel-de-alertas]
---

# POST https://api.agflow.agrisk.dev/v1/cards/69fe1d512c973ce220c49757/actions/decision-engine/clients/69c18b48bc333a6ce8784a5c

## Observações

-
---

## Swagger

**Operação:** `CardController_executeDecisionEngine`

**Resumo:** Classificar utilizando motor de crédito

**Descrição:** Rota responsável pela classificação do cliente utilizando o motor de crédito.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `clientId` | path | string | ✓ |  |

### Response — Find Decision Engine by clientId


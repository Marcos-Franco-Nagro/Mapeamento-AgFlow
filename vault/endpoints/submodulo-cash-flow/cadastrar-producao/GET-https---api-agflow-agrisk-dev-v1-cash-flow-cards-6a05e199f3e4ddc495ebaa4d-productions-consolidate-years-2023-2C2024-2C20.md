---
method: GET
url: "https://api.agflow.agrisk.dev/v1/cash-flow/cards/6a05e199f3e4ddc495ebaa4d/productions/consolidate?years=2023%2C2024%2C2025%2C2026%2C2027"
status: 200
tags: [endpoint, agflow, cash-flow, cadastrar-producao]
---

# GET https://api.agflow.agrisk.dev/v1/cash-flow/cards/6a05e199f3e4ddc495ebaa4d/productions/consolidate?years=2023%2C2024%2C2025%2C2026%2C2027

## Observações

-
---

## Swagger

**Operação:** `CashFlowController_consolidateProduction`

**Resumo:** Visualizar produções (consolidada)

**Descrição:** Rota responsável pela visualização (consolidada) das produções.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `cultures` | query | array | ✓ |  |
| `years` | query | array | ✓ |  |

### Response


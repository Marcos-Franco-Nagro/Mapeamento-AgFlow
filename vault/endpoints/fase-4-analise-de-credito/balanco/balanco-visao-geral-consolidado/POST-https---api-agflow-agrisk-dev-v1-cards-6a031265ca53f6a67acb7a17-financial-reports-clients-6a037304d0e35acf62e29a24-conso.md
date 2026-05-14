---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cards/6a031265ca53f6a67acb7a17/financial-reports/clients/6a037304d0e35acf62e29a24/consolidated"
status: 201
tags: [endpoint, agflow, balanco\balanco-visao-geral-consolidado]
---

# POST https://api.agflow.agrisk.dev/v1/cards/6a031265ca53f6a67acb7a17/financial-reports/clients/6a037304d0e35acf62e29a24/consolidated

## Observações

-
---

## Swagger

**Operação:** `FinancialReportController_createConsolidatedReport`

**Resumo:** Criar relatório financeiro consolidado

**Descrição:** Rota responsável por solicitar a criação de um relatório financeiro consolidado no AgRisk.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |
| `cardId` | path | string | ✓ |  |

### Response


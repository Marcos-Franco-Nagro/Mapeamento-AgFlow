---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cards/6a031265ca53f6a67acb7a17/financial-reports/6a032de0609f0c6fd13278af/items/6a036956d0e35acf62e26ade/analysis"
status: 201
tags: [endpoint, agflow, balanco\balanco-revisar]
---

# POST https://api.agflow.agrisk.dev/v1/cards/6a031265ca53f6a67acb7a17/financial-reports/6a032de0609f0c6fd13278af/items/6a036956d0e35acf62e26ade/analysis

## Observações

-
---

## Swagger

**Operação:** `FinancialReportController_newAnalysis`

**Resumo:** Solicitar nova análise

**Descrição:** Rota responsável por solicitar uma nova análise (extração) de um relatório financeiro.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `itemId` | path | string | ✓ |  |
| `cardId` | path | string | ✓ |  |
| `id` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `balanceSheet` | object | ✓ |  |
| `incomeStatement` | object | ✓ |  |

### Response


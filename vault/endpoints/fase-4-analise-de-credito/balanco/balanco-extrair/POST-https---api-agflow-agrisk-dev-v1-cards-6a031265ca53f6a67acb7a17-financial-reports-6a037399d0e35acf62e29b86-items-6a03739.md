---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cards/6a031265ca53f6a67acb7a17/financial-reports/6a037399d0e35acf62e29b86/items/6a037399d0e35acf62e29b87/analysis"
status: 201
tags: [endpoint, agflow, balanco\balanco-extrair]
---

# POST https://api.agflow.agrisk.dev/v1/cards/6a031265ca53f6a67acb7a17/financial-reports/6a037399d0e35acf62e29b86/items/6a037399d0e35acf62e29b87/analysis

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


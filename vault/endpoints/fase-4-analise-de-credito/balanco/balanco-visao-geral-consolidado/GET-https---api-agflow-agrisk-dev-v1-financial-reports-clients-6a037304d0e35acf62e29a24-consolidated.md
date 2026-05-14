---
method: GET
url: "https://api.agflow.agrisk.dev/v1/financial-reports/clients/6a037304d0e35acf62e29a24/consolidated"
status: 200
tags: [endpoint, agflow, balanco\balanco-visao-geral-consolidado]
---

# GET https://api.agflow.agrisk.dev/v1/financial-reports/clients/6a037304d0e35acf62e29a24/consolidated

## Observações

-
---

## Swagger

**Operação:** `FinancialReportController_listConsolidatedReport`

**Resumo:** Listar relatório financeiro consolidado

**Descrição:** Retorna o relatório consolidado e os cards gráficos dos últimos 4 anos do cliente.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response


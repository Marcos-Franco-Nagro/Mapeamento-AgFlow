---
method: GET
url: "https://api.agflow.agrisk.dev/v1/financial-reports/clients/6920628bf0a92b6d707e4a8a/consolidated"
status: 200
tags: [endpoint, agflow, balanco\balanco-revisar]
---

# GET https://api.agflow.agrisk.dev/v1/financial-reports/clients/6920628bf0a92b6d707e4a8a/consolidated

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


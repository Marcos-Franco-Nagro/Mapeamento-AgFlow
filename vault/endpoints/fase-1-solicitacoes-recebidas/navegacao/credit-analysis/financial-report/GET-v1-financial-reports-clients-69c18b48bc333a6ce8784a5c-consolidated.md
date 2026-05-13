---
method: GET
url: "https://api.agflow.agrisk.dev/v1/financial-reports/clients/69c18b48bc333a6ce8784a5c/consolidated"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/financial-reports/clients/69c18b48bc333a6ce8784a5c/consolidated

## Features que consomem este endpoint

- [[fase1-credit-analysis-financial-report]]

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


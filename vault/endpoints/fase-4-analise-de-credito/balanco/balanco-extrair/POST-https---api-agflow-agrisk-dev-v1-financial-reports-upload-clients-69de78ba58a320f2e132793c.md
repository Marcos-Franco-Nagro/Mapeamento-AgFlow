---
method: POST
url: "https://api.agflow.agrisk.dev/v1/financial-reports/upload/clients/69de78ba58a320f2e132793c"
status: 201
tags: [endpoint, agflow, balanco\balanco-extrair]
---

# POST https://api.agflow.agrisk.dev/v1/financial-reports/upload/clients/69de78ba58a320f2e132793c

## Observações

-
---

## Swagger

**Operação:** `FinancialReportController_uploadFinancialReportFile`

**Resumo:** Upload de relatório financeiro

**Descrição:** Rota responsável pelo upload de um relatório financeiro.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `fileName` | string | ✓ |  |
| `fileSize` | number | ✓ |  |
| `mimeType` | string | ✓ |  |

### Response


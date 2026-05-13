---
method: POST
url: "https://api.agflow.agrisk.dev/v1/financial-reports/clients/6a037148d0e35acf62e29064"
status: 201
tags: [endpoint, agflow, balanco\balanco-extrair]
---

# POST https://api.agflow.agrisk.dev/v1/financial-reports/clients/6a037148d0e35acf62e29064

## Observações

-
---

## Swagger

**Operação:** `FinancialReportController_createFinancialReport`

**Resumo:** Rota de criação de relatório financeiro

**Descrição:** Rota responsável pela criação de um relatório financeiro.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `fileName` | string | ✓ |  |
| `fileType` | string | ✓ |  |
| `fileUrl` | string | ✓ |  |
| `year` | string | ✓ |  |

### Response


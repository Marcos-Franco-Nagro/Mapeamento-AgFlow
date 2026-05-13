---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/lawsuit/69c18b48bc333a6ce8784a5c/filters"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/lawsuit/69c18b48bc333a6ce8784a5c/filters

## Features que consomem este endpoint

- [[fase5-agrisk-judicial]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listLawsuitsFilters`

**Resumo:** Visualizar filtros de processos judiciais

**Descrição:** Rota responsável pela visualização dos filtros de processos judiciais.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — List Lawsuits Filters

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `filters` | array | ✓ |  |

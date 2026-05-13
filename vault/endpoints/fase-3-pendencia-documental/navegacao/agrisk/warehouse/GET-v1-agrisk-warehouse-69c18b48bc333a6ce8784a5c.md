---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/warehouse/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/warehouse/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase3-agrisk-warehouse]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listWarehouse`

**Resumo:** Visualizar armazéns

**Descrição:** Rota responsável pela visualização do resultado da consulta de armazéns.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — List Warehouse

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `items` | array | ✓ |  |

---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/farmer-record/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/farmer-record/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase5-agrisk-sintegra]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listFarmerRecord`

**Resumo:** Visualizar consulta ao Sintegra

**Descrição:** Rota responsável pela visualização do resultado da consulta ao Sintegra.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — Sintegra

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `farmerRecords` | object | ✓ |  |
| `query` | object | ✓ |  |

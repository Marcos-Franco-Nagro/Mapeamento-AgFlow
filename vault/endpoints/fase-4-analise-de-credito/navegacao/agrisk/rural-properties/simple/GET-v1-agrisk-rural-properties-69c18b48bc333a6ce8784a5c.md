---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/rural-properties/69c18b48bc333a6ce8784a5c?limit=10&offset=0"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/rural-properties/69c18b48bc333a6ce8784a5c?limit=10&offset=0

## Features que consomem este endpoint

- [[fase4-agrisk-rural-properties-simple]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_findAllRuralProperties`

**Resumo:** Visualizar imóveis rurais

**Descrição:** Rota responsável pela visualização do resultado da consulta dos imóveis rurais.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |
| `offset` | query | number |  |  |
| `limit` | query | number |  |  |

### Response — List Rural Properties

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `ruralProperties` | object | ✓ |  |

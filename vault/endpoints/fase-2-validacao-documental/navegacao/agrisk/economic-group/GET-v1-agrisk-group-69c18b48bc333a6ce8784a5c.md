---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/group/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/group/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase2-agrisk-economic-group]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listGroup`

**Resumo:** Visualizar grupos (econômico e familiar)

**Descrição:** Rota responsável pela visualização do resultado da consulta dos grupos.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — List Group

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `economic` | object | ✓ |  |
| `family` | object | ✓ |  |

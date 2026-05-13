---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/vehicle-assets/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/vehicle-assets/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase4-agrisk-vehicles]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listVehicleAssets`

**Resumo:** Visualizar automóveis

**Descrição:** Rota responsável pela visualização do resultado da consulta dos automóveis.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — List Vehicle Assets

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `items` | array | ✓ |  |
| `totalValue` | number | ✓ |  |
| `totalVehicles` | number | ✓ |  |

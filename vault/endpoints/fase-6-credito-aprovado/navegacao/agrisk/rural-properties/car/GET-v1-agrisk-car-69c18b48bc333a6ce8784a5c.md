---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/car/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/car/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase6-agrisk-rural-properties-car]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listCar`

**Resumo:** Visualizar CAR

**Descrição:** Rota responsável pela visualização do resultado da consulta do(s) CAR(s).

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |
| `offset` | query | number |  |  |
| `limit` | query | number |  |  |

### Response — List CAR

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `car` | object | ✓ |  |
| `query` | object | ✓ |  |

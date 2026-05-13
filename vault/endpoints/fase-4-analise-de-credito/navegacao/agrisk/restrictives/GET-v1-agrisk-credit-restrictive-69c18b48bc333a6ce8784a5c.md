---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/credit-restrictive/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/credit-restrictive/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase4-agrisk-restrictives]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listCreditRestrictive`

**Resumo:** Visualizar Restritivos de Créditos

**Descrição:** Rota responsável pela visualização do resultado da consulta nos restritivos de créditos nacional.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — Restritivo Nacional

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `protests` | object | ✓ |  |
| `query` | object | ✓ |  |

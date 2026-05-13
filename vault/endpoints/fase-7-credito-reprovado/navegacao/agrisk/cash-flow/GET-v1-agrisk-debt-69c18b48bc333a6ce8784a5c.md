---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/debt/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/debt/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase7-agrisk-cash-flow]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listDebts`

**Resumo:** Visualizar endividamento

**Descrição:** Rota responsável pela visualização do resultado da consulta do endividamento.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — List Debts

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `indicators` | object | ✓ |  |
| `chart` | object | ✓ |  |

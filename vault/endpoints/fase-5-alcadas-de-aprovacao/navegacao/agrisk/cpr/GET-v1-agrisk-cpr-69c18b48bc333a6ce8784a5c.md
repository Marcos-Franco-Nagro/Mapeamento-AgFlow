---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/cpr/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/cpr/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase5-agrisk-cpr]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listCprs`

**Resumo:** Visualizar CPR

**Descrição:** Rota responsável pela visualização do resultado da consulta das Cédula(s) do Produtor Rural.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — List CPRs

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `nature` | array | ✓ |  |
| `procedure` | array | ✓ |  |
| `status` | array | ✓ |  |
| `items` | array | ✓ |  |

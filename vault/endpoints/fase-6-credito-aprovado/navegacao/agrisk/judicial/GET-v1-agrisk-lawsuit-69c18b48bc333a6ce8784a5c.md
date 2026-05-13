---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/lawsuit/69c18b48bc333a6ce8784a5c?offset=0&limit=10&sort=publicationDate"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/lawsuit/69c18b48bc333a6ce8784a5c?offset=0&limit=10&sort=publicationDate

## Features que consomem este endpoint

- [[fase6-agrisk-judicial]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listLawsuits`

**Resumo:** Visualizar processos judiciais

**Descrição:** Rota responsável pela visualização do resultado da consulta dos processos judiciais.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |
| `offset` | query | number |  |  |
| `limit` | query | number |  |  |
| `pole` | query | string |  | Filtro por polo: active, passive, others. Aceita múltiplos valores separados por vírgula (ex: active,passive) |
| `status` | query | string |  | Filtro por status do processo. Aceita múltiplos valores separados por vírgula (ex: ativo,arquivado) |
| `tags` | query | string |  | Filtro por natureza: civil, trabalhista, criminal, tributario, ni. Aceita múltiplos valores separados por vírgula (ex: civil,trabalhista) |
| `homonyms` | query | string |  | Filtro por homonimia: true, false. Aceita múltiplos valores separados por vírgula (ex: true,false) |
| `states` | query | string |  | Filtro por estado (UF) ou "ni" para não identificado. Aceita múltiplos valores separados por vírgula (ex: SP,RJ,MG ou SP,ni) |
| `numFilter` | query | string |  | Filtro por número do processo |
| `sort` | query | string |  | Campo para ordenação dos resultados |

### Response — List Lawsuits

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `nature` | array | ✓ |  |
| `procedure` | array | ✓ |  |
| `status` | array | ✓ |  |
| `items` | array | ✓ |  |

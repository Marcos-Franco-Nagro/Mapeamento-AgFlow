---
method: GET
url: "https://api.agflow.agrisk.dev/v1/clients/69c18b48bc333a6ce8784a5c"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/clients/69c18b48bc333a6ce8784a5c

## Features que consomem este endpoint

- [[fase2-agrisk-restrictives]]

## Observações

-
---

## Swagger

**Operação:** `ClientController_findClientInfos`

**Resumo:** Visualizar cliente

**Descrição:** Rota responsável pela visualização do resultado da consulta dos dados básicos junto com email, endereço e telefone.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `clientId` | path | string | ✓ |  |

### Response — Client Details

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `id` | string |  |  |
| `refId` | string |  |  |
| `companyId` | string | ✓ |  |
| `taxId` | string | ✓ |  |
| `kind` | string |  |  |
| `active` | boolean |  |  |
| `name` | string |  |  |
| `gender` | string |  |  |
| `birthDate` | string |  |  |
| `age` | number |  |  |
| `motherName` | string |  |  |
| `fatherName` | string |  |  |
| `taxIdStatus` | string |  |  |
| `hasObitIndication` | boolean |  |  |
| `lastUpdateDate` | string |  |  |
| `alternativeIdNumbers` | object |  |  |
| `maritalStatus` | string |  |  |
| `detailScore` | object |  |  |
| `addresses` | array |  |  |
| `phones` | array |  |  |
| `emails` | array |  |  |
| `scrAuthorized` | boolean | ✓ |  |

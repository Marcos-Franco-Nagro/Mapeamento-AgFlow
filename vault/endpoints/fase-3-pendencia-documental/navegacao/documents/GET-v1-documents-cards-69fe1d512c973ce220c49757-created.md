---
method: GET
url: "https://api.agflow.agrisk.dev/v1/documents/cards/69fe1d512c973ce220c49757/created?fileName="
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/documents/cards/69fe1d512c973ce220c49757/created?fileName=

## Features que consomem este endpoint

- [[fase3-documents]]

## Observações

-
---

## Swagger

**Operação:** `DocumentController_findAllCreatedCardDocument`

**Resumo:** Listar documentos criados

**Descrição:** Rota responsável pela listagem dos documentos criados em uma oportunidade.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `fileName` | query | string | ✓ |  |

### Response


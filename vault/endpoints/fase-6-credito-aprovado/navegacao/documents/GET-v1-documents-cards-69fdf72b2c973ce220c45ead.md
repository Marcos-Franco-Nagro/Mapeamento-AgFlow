---
method: GET
url: "https://api.agflow.agrisk.dev/v1/documents/cards/69fdf72b2c973ce220c45ead?fileName="
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/documents/cards/69fdf72b2c973ce220c45ead?fileName=

## Features que consomem este endpoint

- [[fase6-documents]]

## Observações

-
---

## Swagger

**Operação:** `DocumentController_findAllCardDocument`

**Resumo:** Listar documentos na oportunidade

**Descrição:** Rota responsável pela listagem dos documentos em uma oportunidade.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `fileName` | query | string | ✓ |  |

### Response


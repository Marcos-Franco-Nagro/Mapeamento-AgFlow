---
method: GET
url: "https://api.agflow.agrisk.dev/v1/documents/cards/69fdf7c72c973ce220c469c3?fileName="
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/documents/cards/69fdf7c72c973ce220c469c3?fileName=

## Features que consomem este endpoint

- [[fase7-documents]]

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


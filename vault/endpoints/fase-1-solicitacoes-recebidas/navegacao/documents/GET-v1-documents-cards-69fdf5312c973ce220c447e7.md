---
method: GET
url: "https://api.agflow.agrisk.dev/v1/documents/cards/69fdf5312c973ce220c447e7?fileName="
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/documents/cards/69fdf5312c973ce220c447e7?fileName=

## Features que consomem este endpoint

- [[fase1-documents]]

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


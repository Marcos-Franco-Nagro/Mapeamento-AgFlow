---
method: GET
url: "https://api.agflow.agrisk.dev/v1/documents/cards/69fdf6192c973ce220c45316/created?fileName="
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/documents/cards/69fdf6192c973ce220c45316/created?fileName=

## Features que consomem este endpoint

- [[fase5-documents]]

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


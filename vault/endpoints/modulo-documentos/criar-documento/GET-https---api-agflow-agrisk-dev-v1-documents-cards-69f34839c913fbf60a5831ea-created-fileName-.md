---
method: GET
url: "https://api.agflow.agrisk.dev/v1/documents/cards/69f34839c913fbf60a5831ea/created?fileName="
status: 200
tags: [endpoint, agflow, documentos, criar-documento]
---

# GET https://api.agflow.agrisk.dev/v1/documents/cards/69f34839c913fbf60a5831ea/created?fileName=

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


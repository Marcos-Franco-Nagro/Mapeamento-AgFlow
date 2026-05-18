---
method: POST
url: "https://api.agflow.agrisk.dev/v1/documents/69f34839c913fbf60a5831f6/card"
status: 400
tags: [endpoint, agflow, documentos, criar-documento]
---

# POST https://api.agflow.agrisk.dev/v1/documents/69f34839c913fbf60a5831f6/card

## Observações

-
---

## Swagger

**Operação:** `DocumentController_addingFilesToCard`

**Resumo:** Adicionar documento na oportunidade

**Descrição:** Rota responsável pela adição de um documento em uma oportunidade.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `documentId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `files` | array | ✓ |  |
| `tagName` | string | ✓ |  |

### Response


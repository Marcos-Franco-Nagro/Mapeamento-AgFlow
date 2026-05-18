---
method: POST
url: "https://api.agflow.agrisk.dev/v1/documents/69c18b48bc333a6ce8784a61/client"
status: 200
tags: [endpoint, agflow, documentos]
---

# POST https://api.agflow.agrisk.dev/v1/documents/69c18b48bc333a6ce8784a61/client

## Observações

-
---

## Swagger

**Operação:** `DocumentController_addFilesToClient`

**Resumo:** Adicionar documento no cliente

**Descrição:** Rota responsável pela adição de um documento em um cliente.

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


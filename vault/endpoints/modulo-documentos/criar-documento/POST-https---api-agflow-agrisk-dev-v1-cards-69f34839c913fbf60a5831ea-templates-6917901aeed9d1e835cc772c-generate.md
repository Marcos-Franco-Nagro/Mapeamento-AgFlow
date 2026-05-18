---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cards/69f34839c913fbf60a5831ea/templates/6917901aeed9d1e835cc772c/generate"
status: 201
tags: [endpoint, agflow, documentos, criar-documento]
---

# POST https://api.agflow.agrisk.dev/v1/cards/69f34839c913fbf60a5831ea/templates/6917901aeed9d1e835cc772c/generate

## Observações

-
---

## Swagger

**Operação:** `CardController_generateDocument`

**Resumo:** Criar documento

**Descrição:** Rota responsável pela criação de um documento utilizando o template.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `templateId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `fileName` | string | ✓ |  |
| `fields` | object | ✓ |  |

### Response — Generate document


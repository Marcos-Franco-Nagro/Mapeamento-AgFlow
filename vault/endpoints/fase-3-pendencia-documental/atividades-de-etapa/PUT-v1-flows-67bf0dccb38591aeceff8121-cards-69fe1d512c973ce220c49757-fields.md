---
method: PUT
url: "https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/cards/69fe1d512c973ce220c49757/fields"
status: 200
tags: [endpoint, agflow]
---

# PUT https://api.agflow.agrisk.dev/v1/flows/67bf0dccb38591aeceff8121/cards/69fe1d512c973ce220c49757/fields

## Features que consomem este endpoint

- [[fase-3-pendencia-documental-atividades]]

## Observações

-
---

## Swagger

**Operação:** `FlowController_saveCardFields`

**Resumo:** Atualizar campos de uma oportunidade

**Descrição:** Rota responsável pela atualização dos campos de uma oportunidade.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `id` | path | string | ✓ |  |
| `cardId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `fields` | array | ✓ |  |

### Response


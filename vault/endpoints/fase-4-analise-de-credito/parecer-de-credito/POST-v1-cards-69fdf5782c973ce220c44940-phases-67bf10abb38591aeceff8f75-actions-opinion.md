---
method: POST
url: "https://api.agflow.agrisk.dev/v1/cards/69fdf5782c973ce220c44940/phases/67bf10abb38591aeceff8f75/actions/opinion"
status: 201
tags: [endpoint, agflow]
---

# POST https://api.agflow.agrisk.dev/v1/cards/69fdf5782c973ce220c44940/phases/67bf10abb38591aeceff8f75/actions/opinion

## Features que consomem este endpoint

- [[fase-4-analise-de-credito-parecer]]

## Observações

-
---

## Swagger

**Operação:** `CardController_createOpinion`

**Resumo:** Cadastrar parecer de crédito

**Descrição:** Rota responsável pelo cadastro do parecer de crédito.

### Parâmetros

| Nome | Local | Tipo | Obrigatório | Descrição |
|------|-------|------|-------------|-----------|
| `cardId` | path | string | ✓ |  |
| `phaseId` | path | string | ✓ |  |

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `status` | string | ✓ |  |
| `value` | number | ✓ |  |
| `opinion` | string | ✓ |  |
| `fields` | array | ✓ |  |

### Response — Opinion created


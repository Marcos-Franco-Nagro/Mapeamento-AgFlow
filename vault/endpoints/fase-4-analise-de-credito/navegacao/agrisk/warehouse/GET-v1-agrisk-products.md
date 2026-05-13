---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/products"
status: 502
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/products

## Features que consomem este endpoint

- [[fase4-agrisk-warehouse]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listAllProducts`

**Resumo:** Listar produtos

**Descrição:** Rota responsável pela listagem dos produtos disponíveis para consultar.

### Response — Produtos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `items` | array | ✓ |  |

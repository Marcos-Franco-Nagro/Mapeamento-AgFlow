---
method: GET
url: "https://api.agflow.agrisk.dev/v1/agrisk/notifications"
status: 200
tags: [endpoint, agflow]
---

# GET https://api.agflow.agrisk.dev/v1/agrisk/notifications

## Features que consomem este endpoint

- [[fase5-summary-history]]

## Observações

-
---

## Swagger

**Operação:** `AgRiskController_listNotifications`

**Resumo:** Listar notificações

**Descrição:** Rota responsável pela listagem das notificações de instabilidade do AgRisk.

### Response — Notificações

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|----------|
| `items` | array | ✓ | Lista de notificações |

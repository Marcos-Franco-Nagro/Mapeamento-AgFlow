# Fase 3 — Pendência Documental

**Fase ID (interna):** 67bf1082b38591aeceff8ee3
**Posição no funil:** Terceira fase — cards com documentação incompleta ou pendente

## O que é esta fase?

Cards chegam aqui quando a documentação está incompleta ou há pendências a resolver. O solicitante é acionado para complementar os documentos. Após regularização, o card volta para Validação Documental ou avança direto para Análise de Crédito.

## Módulos disponíveis

### 1. Resumo Geral

Mesmos sub-módulos das fases anteriores: Visão Geral, Atividades da Etapa, Ficha Cadastral e Histórico.

**Ações disponíveis:**
- Voltar etapa (backStep) — retorna à Fase 2
- Avançar etapa (moveStep) — avança para próxima fase
- Ver histórico completo
- Acessar documento — link direto para documentos pendentes específicos
- Registros e Comentários

---

### 2. AgRisk

Idêntico às fases anteriores. Todos os sub-módulos disponíveis.

---

### 3. Documentos

Idêntico às fases anteriores.

**Ações disponíveis:**
- Novo documento
- Organização por categorias
- Filtro por cliente

---

### 4. Análise de Crédito

O módulo aparece no menu de navegação, mas exibe a mensagem:
> "Nenhuma ação de análise de crédito disponível nesta etapa."

Nenhuma ação de análise está habilitada na Fase 3.

---

## Endpoints principais consumidos

| Endpoint | Descrição |
|----------|-----------|
| `GET /v1/flows/{flowId}` | Configurações do flow |
| `GET /v1/cards/{cardId}/clients` | Clientes da solicitação |
| `GET /v1/cards/{cardId}/fields/phases/{phaseId}` | Campos da fase 3 |
| `GET /v1/cards/{cardId}/history` | Histórico do card |

---

## Padrão de URL

```
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/summary/overview
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/agrisk/registration
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/documents
```

---

## Fluxo esperado nesta fase

1. Analista identifica quais documentos estão pendentes via Resumo Geral (link Acessar documento)
2. Aciona o solicitante para complementar documentação
3. Após regularização, avança o card para Fase 4 (Análise de Crédito)

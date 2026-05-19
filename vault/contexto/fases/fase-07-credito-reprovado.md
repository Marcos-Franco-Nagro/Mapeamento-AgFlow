# Fase 7 — Crédito Reprovado

**Fase ID (interna):** 67bf11b6b38591aeceff969b
**Posição no funil:** Sétima fase — operações com crédito reprovado

## O que é esta fase?

Cards que chegam aqui tiveram o crédito reprovado — seja por decisão direta do analista ou após reprovação de alçada. Esta fase permite consultar o histórico e, se necessário, revisitar a análise (botão voltar etapa disponível).

## Módulos disponíveis

### 1. Resumo Geral

Mesmos sub-módulos: Visão Geral, Atividades da Etapa, Ficha Cadastral, Histórico.

**Ações:**
- Adicionar cliente
- Adicionar responsável
- Etiquetas
- Voltar etapa (backStep) — permite revisão da reprovação
- Avançar etapa (moveStep)
- **Classificar cliente** — disponível para registrar a classificação do cliente reprovado
- Registros e Comentários
- Ver histórico completo

---

### 2. AgRisk

Idêntico às fases anteriores. Todos os sub-módulos disponíveis para consulta.

---

### 3. Análise de Crédito

Todos os sub-módulos permanecem disponíveis para consulta e auditoria.

**Sub-módulos acessíveis:**
- Painel de alertas
- Fluxo de caixa
- Balanço e DRE
- Motor de crédito
- Parecer de crédito
- Aprovações de alçada (histórico da reprovação)

---

### 4. Documentos

Idêntico às fases anteriores.

---

## Endpoints principais consumidos

| Endpoint | Descrição |
|----------|-----------|
| `GET /v1/cards/{cardId}/phases/{phaseId}/actions/opinion` | Parecer registrado |
| `GET /v1/cards/{cardId}/phases/{phaseId}/actions/approval` | Registro da reprovação |
| `GET /v1/cards/{cardId}/fields/phases/{phaseId}` | Campos configurados para a fase reprovada |
| `GET /v1/cards/{cardId}/history` | Histórico completo do processo |
| `GET /v1/flows/{flowId}/credit-engine/policies/cards/{cardId}/clients/{clientId}` | Resultado do motor de crédito |

---

## Padrão de URL

```
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/summary/overview
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/credit-analysis/credit-engine
```

---

## Diferença entre Fase 6 e Fase 7

| Aspecto | Fase 6 — Aprovado | Fase 7 — Reprovado |
|---------|-------------------|-------------------|
| Status visual no kanban | "Aprovado" | "Reprovado" |
| Ação Classificar cliente | Disponível | Disponível |
| Voltar etapa | Disponível | Disponível |
| Auditoria do processo | Completa | Completa |

As duas fases têm estrutura idêntica — a diferença está apenas no resultado da aprovação/reprovação.

---

## Características desta fase

- Os cards aqui têm status visual de **Reprovado** no quadro kanban
- A ação **Classificar cliente** permite registrar o motivo/categoria da reprovação
- É possível reabrir o processo clicando em **Voltar etapa** para revisão
- O histórico completo do processo de crédito está disponível para auditoria e aprendizado

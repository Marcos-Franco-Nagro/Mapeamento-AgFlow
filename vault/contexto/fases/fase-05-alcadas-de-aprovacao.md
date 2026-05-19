# Fase 5 — Alçadas de Aprovação

**Fase ID (interna):** 67bf114fb38591aeceff94fa
**Posição no funil:** Quinta fase — aprovação hierárquica da operação de crédito

## O que é esta fase?

Após o parecer de crédito emitido na Fase 4, as operações que exigem aprovação de alçada são enviadas para esta fase. Um aprovador com a alçada adequada revisa a análise e aprova ou reprova a operação. O resultado define se o card vai para Fase 6 (Aprovado) ou Fase 7 (Reprovado).

## Módulos disponíveis

### 1. Resumo Geral

Mesmos sub-módulos das fases anteriores: Visão Geral, Atividades da Etapa, Ficha Cadastral, Histórico.

**Ações:**
- Etiquetas
- Voltar etapa / Avançar etapa
- Registros e Comentários

---

### 2. AgRisk

Idêntico às fases anteriores. Todos os sub-módulos disponíveis para consulta.

---

### 3. Análise de Crédito

Todos os sub-módulos da Fase 4 permanecem disponíveis para consulta. O sub-módulo principal desta fase é:

#### 3.6 Aprovações de Alçada (ATIVO NESTA FASE)

**URL:** `.../credit-analysis/approvals`

Esta é a tela central da Fase 5, onde a ação de aprovação é executada.

**Ações:**
- **Processar os dados** — submete a operação ao processo de aprovação de alçada
- Selecionar cliente para a aprovação (campo de seleção)

**Demais sub-módulos disponíveis para consulta (sem novas ações):**
- Painel de alertas
- Fluxo de caixa
- Balanço e DRE
- Motor de crédito
- Parecer de crédito

---

### 4. Documentos

Idêntico às fases anteriores.

---

## Diferença entre Fase 4 e Fase 5 no sub-módulo Aprovações de alçada

| Aspecto | Fase 4 | Fase 5 |
|---------|--------|--------|
| Status do sub-módulo | Informativo — mostra que não foi submetido | Ativo — permite processar a aprovação |
| Ação disponível | Nenhuma (visualização) | Processar os dados |
| Decisão | N/A | Aprovação ou reprovação |

---

## Endpoints principais consumidos

| Endpoint | Descrição |
|----------|-----------|
| `GET /v1/cards/{cardId}/phases/{phaseId}/actions/opinion` | Parecer disponível na fase |
| `GET /v1/cards/{cardId}/phases/{phaseId}/actions/approval` | Ação de aprovação da fase |
| `GET /v1/cards/{cardId}/clients` | Clientes da solicitação |

---

## Padrão de URL

```
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/credit-analysis/approvals
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/summary/overview
```

---

## Fluxo esperado nesta fase

1. Aprovador acessa o card e consulta o parecer (Parecer de crédito)
2. Revisa o motor de crédito e alertas se necessário
3. Acessa **Aprovações de alçada** e clica em **Processar os dados**
4. Registra a decisão (aprovado/reprovado)
5. Card avança automaticamente para Fase 6 ou Fase 7

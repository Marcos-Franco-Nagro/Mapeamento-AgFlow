# Fase 6 — Crédito Aprovado

**Fase ID (interna):** 67bf118eb38591aeceff95aa
**Posição no funil:** Sexta fase — operações com crédito aprovado

## O que é esta fase?

Cards que chegam aqui tiveram o crédito aprovado — seja por decisão direta do analista na Fase 4 ou após aprovação de alçada na Fase 5. Esta é uma fase de resultado positivo.

## Módulos disponíveis

### 1. Resumo Geral

Mesmos sub-módulos: Visão Geral, Atividades da Etapa, Ficha Cadastral, Histórico.

**Ações:**
- Adicionar cliente
- Adicionar responsável
- Etiquetas
- Voltar etapa (backStep) — possibilidade de revisão
- Avançar etapa (moveStep)
- **Classificar cliente** — ação disponível para classificação pós-aprovação
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
- Aprovações de alçada (histórico da aprovação)

---

### 4. Documentos

Idêntico às fases anteriores.

---

## Endpoints principais consumidos

| Endpoint | Descrição |
|----------|-----------|
| `GET /v1/cards/{cardId}/phases/{phaseId}/actions/opinion` | Parecer registrado |
| `GET /v1/cards/{cardId}/phases/{phaseId}/actions/approval` | Registro da aprovação |
| `GET /v1/cards/{cardId}/fields/phases/{phaseId}` | Campos configurados para a fase aprovada |
| `GET /v1/cards/{cardId}/history` | Histórico completo do processo |
| `GET /v1/flows/{flowId}/credit-engine/policies/cards/{cardId}/clients/{clientId}` | Resultado do motor de crédito |

---

## Padrão de URL

```
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/summary/overview
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/credit-analysis/credit-engine
```

---

## Características desta fase

- Os cards aqui têm status visual de **Aprovado** no quadro kanban
- A ação **Classificar cliente** fica disponível para categorizar o cliente aprovado
- O histórico completo do processo de crédito está acessível para auditoria
- É possível voltar a fase para revisão se necessário (botão backStep)

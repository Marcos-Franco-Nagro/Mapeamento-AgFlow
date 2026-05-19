---
tipo: mapa-telas
descricao: "Mapa de todas as telas, módulos, URLs e endpoints do AgFlow — referência principal para localizar onde um bug ocorre"
tags: [telas, urls, modulos, agflow, navegacao]
---

# Mapa de Telas do AgFlow

## Identificação do Flow

- **Flow ID:** 67bf0dccb38591aeceff8121
- **URL base:** https://agflow.agrisk.dev
- **Versão frontend:** v2.313.0 (referência)

## Visão geral das fases

O AgFlow organiza as solicitações de crédito em um funil com 7 fases lineares, mais uma tela de visão global (Quadro). Cada solicitação é representada por um **card** que avança pelas fases.

| Fase | Nome | Descrição resumida |
|------|------|--------------------|
| 0 | Flow (Quadro/Board) | Visão kanban de todos os cards do funil |
| 1 | Solicitações Recebidas | Entrada de novas solicitações; consulta AgRisk inicial |
| 2 | Validação Documental | Verificação de documentos enviados pelo solicitante |
| 3 | Pendência Documental | Cards com documentação incompleta ou pendente |
| 4 | Análise de Crédito | Motor de crédito, balanço, fluxo de caixa e parecer |
| 5 | Alçadas de Aprovação | Aprovação hierárquica (alçadas) da operação de crédito |
| 6 | Crédito Aprovado | Operações com crédito aprovado |
| 7 | Crédito Reprovado | Operações com crédito reprovado |

---

## Módulos transversais (presentes em todas as fases)

Todo card, independente da fase, possui os seguintes módulos de navegação:

| Módulo | Descrição |
|--------|-----------|
| **Resumo Geral** | Visão geral do card, atividades da etapa, ficha cadastral e histórico |
| **AgRisk** | Dados de risco do cliente: cadastro, Sintegra, grupos econômicos, restrições, compliance, judicial, financeiro, CPRs, patrimônio veicular, armazéns e imóveis rurais |
| **Análise de Crédito** | Disponível a partir da fase 4; contém painel de alertas, fluxo de caixa, motor de crédito, parecer e alçadas |
| **Documentos** | Upload e gestão de documentos vinculados ao card |

---

## Fases e Módulos

### Fase 0 — Flow (Quadro)

**URL padrão:** `/pt/flow/{flowId}/board`

**O que é possível fazer:**
- Visualizar todos os cards do funil em formato kanban (colunas por fase)
- Alternar para visualização em **Tabela** ou **Formulário**
- Filtrar cards
- Criar **Nova solicitação** em qualquer fase via botão por coluna

---

### Fase 1 — Solicitações Recebidas

**Módulos disponíveis:**

**1.1 Resumo Geral**
- Sub-módulos: Visão Geral, Atividades da Etapa, Ficha Cadastral, Histórico
- Ações: Adicionar cliente, Adicionar responsável, gerenciar Etiquetas, Avançar etapa (moveStep), Ver registros e Comentários

**1.2 AgRisk**
- Sub-módulos de consulta:
  - **Cadastro** — dados cadastrais do cliente; ação: Consultar no AgRisk; tabs: Endereços, Telefones, Emails
  - **Sintegra** — consulta de situação fiscal estadual
  - **Grupos Econômicos** — vínculos e grupos do cliente
  - **Restritivos** — restrições cadastrais
  - **Compliance** — análise de compliance
  - **Judicial** — ocorrências judiciais
  - **Financeiro** (cash-flow) — endividamento e autorização de consulta; ação: Consultar, Autorização
  - **CPRs** — cédulas de produto rural registradas
  - **Patrimônio Veicular** — veículos do cliente
  - **Armazéns** — armazéns vinculados
  - **Imóveis Rurais** — propriedades rurais (CAR)
- Ação global: Abrir no AgRisk

**1.3 Documentos**
- Ações: Novo documento, organização por categorias (Documentos Gerais, Imagens, Documentos Criados)

> Nota: Na Fase 1 não existe módulo de Análise de Crédito disponível.

---

### Fase 2 — Validação Documental

**Módulos disponíveis:** idênticos à Fase 1 (Resumo Geral + AgRisk + Documentos)

**Diferenças em relação à Fase 1:**
- Resumo Geral > Visão Geral inclui link **Ver histórico completo**
- Botão **Voltar etapa** (backStep) disponível
- Botão **Avançar etapa** (moveStep) disponível

> Análise de Crédito não está disponível nesta fase.

---

### Fase 3 — Pendência Documental

**Módulos disponíveis:** idênticos às fases 1–2 (Resumo Geral + AgRisk + Documentos)

**Diferenças:**
- Módulo Análise de Crédito aparece no menu mas com mensagem: "Nenhuma ação de análise de crédito disponível nesta etapa"
- Resumo Geral inclui link **Acessar documento** para documentos pendentes
- Botão Voltar etapa disponível

---

### Fase 4 — Análise de Crédito

**Módulos disponíveis:** Resumo Geral + AgRisk + **Análise de Crédito** (completo) + Documentos

**4.x Análise de Crédito — Sub-módulos:**

| Sub-módulo | Ações principais |
|------------|-----------------|
| **Painel de alertas** | Processar os dados; visualizar alertas de Restritivos, Compliance, Judicial, Imóveis CAR, Tempo de experiência |
| **Fluxo de caixa** | Nova área, Cadastrar produção; tabs: Consolidado, Produções, Imóveis rurais |
| **Balanço e DRE** | Processar os dados; visualizar indicadores financeiros |
| **Motor de crédito** | Classificar cliente, Gerar análise, Validar indicadores, Analisar cliente; selecionar política de crédito e cliente |
| **Parecer de crédito** | Realizar parecer |
| **Aprovações de alçada** | Visualiza status; link: "Esta operação não foi submetida a alçada de aprovação" |

**Ações globais do card na fase 4:**
- Adicionar cliente, Etiquetas, Voltar etapa, Avançar etapa

---

### Fase 5 — Alçadas de Aprovação

**Módulos disponíveis:** Resumo Geral + AgRisk + Análise de Crédito + Documentos

**Diferença da Fase 4:**
- Sub-módulo **Aprovações de alçada** fica ativo: ação **Processar os dados** para submeter à alçada de aprovação
- Motor de crédito e Parecer de crédito permanecem acessíveis

---

### Fase 6 — Crédito Aprovado

**Módulos disponíveis:** Resumo Geral + AgRisk + Análise de Crédito + Documentos

**Características:**
- Card com resultado positivo — crédito aprovado
- Resumo Geral inclui ação **Classificar cliente**
- Histórico completo acessível
- Botão Voltar etapa disponível

---

### Fase 7 — Crédito Reprovado

**Módulos disponíveis:** Resumo Geral + AgRisk + Análise de Crédito + Documentos

**Características:**
- Card com resultado negativo — crédito reprovado
- Resumo Geral inclui ação **Classificar cliente**
- Histórico completo acessível
- Botão Voltar etapa disponível (possibilidade de revisão)

---

## Padrões de URL

### Estrutura geral

```
https://agflow.agrisk.dev/pt/flow/{flowId}/card/{cardId}/{modulo}/{submodulo}
```

| Segmento | Descrição |
|----------|-----------|
| `pt` | Idioma (português) |
| `flow/{flowId}` | ID do flow (funil de crédito) |
| `card/{cardId}` | ID do card (solicitação individual) |
| `{modulo}` | Módulo: `summary`, `agrisk`, `credit-analysis`, `documents` |
| `{submodulo}` | Sub-módulo específico do módulo |

### Rotas por módulo

| Módulo | Rota |
|--------|------|
| Quadro (Board) | `/pt/flow/{flowId}/board` |
| Tabela | `/pt/flow/{flowId}/table` |
| Formulário | `/pt/flow/{flowId}/form` |
| Resumo — Visão Geral | `/pt/flow/{flowId}/card/{cardId}/summary/overview` |
| Resumo — Atividades da Etapa | `/pt/flow/{flowId}/card/{cardId}/summary/stages` |
| Resumo — Ficha Cadastral | `/pt/flow/{flowId}/card/{cardId}/summary/registration` |
| Resumo — Histórico | `/pt/flow/{flowId}/card/{cardId}/summary/history` |
| AgRisk — Cadastro | `/pt/flow/{flowId}/card/{cardId}/agrisk/registration` |
| AgRisk — Sintegra | `/pt/flow/{flowId}/card/{cardId}/agrisk/sintegra` |
| AgRisk — Grupos Econômicos | `/pt/flow/{flowId}/card/{cardId}/agrisk/economic-group` |
| AgRisk — Restritivos | `/pt/flow/{flowId}/card/{cardId}/agrisk/restrictive` |
| AgRisk — Compliance | `/pt/flow/{flowId}/card/{cardId}/agrisk/compliance` |
| AgRisk — Judicial | `/pt/flow/{flowId}/card/{cardId}/agrisk/judicial` |
| AgRisk — Financeiro/CPR | `/pt/flow/{flowId}/card/{cardId}/agrisk/cash-flow` |
| AgRisk — CPRs | `/pt/flow/{flowId}/card/{cardId}/agrisk/cpr` |
| AgRisk — Veículos | `/pt/flow/{flowId}/card/{cardId}/agrisk/vehicles` |
| AgRisk — Armazéns | `/pt/flow/{flowId}/card/{cardId}/agrisk/warehouse` |
| AgRisk — Imóveis CAR | `/pt/flow/{flowId}/card/{cardId}/agrisk/rural-properties-car` |
| Análise — Painel de alertas | `/pt/flow/{flowId}/card/{cardId}/credit-analysis/alerts-panel` |
| Análise — Fluxo de caixa | `/pt/flow/{flowId}/card/{cardId}/credit-analysis/cash-flow/consolidated` |
| Análise — Balanço e DRE | `/pt/flow/{flowId}/card/{cardId}/credit-analysis/balance-sheet` |
| Análise — Motor de crédito | `/pt/flow/{flowId}/card/{cardId}/credit-analysis/credit-engine` |
| Análise — Parecer de crédito | `/pt/flow/{flowId}/card/{cardId}/credit-analysis/credit-opinion` |
| Análise — Aprovações de alçada | `/pt/flow/{flowId}/card/{cardId}/credit-analysis/approvals` |
| Documentos | `/pt/flow/{flowId}/card/{cardId}/documents` |

---

## Endpoints principais da API (padrão)

| Tipo | Endpoint padrão | Descrição |
|------|----------------|-----------|
| GET | `/v1/flows/{flowId}` | Dados do flow/funil |
| GET | `/v1/cards/{cardId}/clients` | Clientes vinculados ao card |
| GET | `/v1/cards/{cardId}/history` | Histórico de alterações |
| GET | `/v1/cards/{cardId}/fields/phases/{phaseId}` | Campos da fase atual |
| GET | `/v1/agrisk/products` | Produtos do AgRisk |
| GET | `/v1/agrisk/notifications` | Notificações AgRisk |
| GET | `/v1/clients/{clientId}` | Dados do cliente |
| GET | `/v1/agrisk/debt/{clientId}` | Endividamento do cliente |
| GET | `/v1/documents/cards/{cardId}` | Documentos do card |
| GET | `/v1/flows/{flowId}/credit-engine/policies/cards/{cardId}/clients/{clientId}` | Políticas do motor de crédito |
| GET | `/v1/cards/{cardId}/actions/credit-engine/policies/{policyId}/clients/{clientId}` | Resultado do motor de crédito |
| GET | `/v1/cards/{cardId}/actions/decision-engine/clients/{clientId}` | Motor de decisão |
| GET | `/v1/cards/{cardId}/phases/{phaseId}/actions/opinion` | Ação de parecer da fase |
| GET | `/v1/cards/{cardId}/phases/{phaseId}/actions/approval` | Ação de aprovação da fase |

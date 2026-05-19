# Fase 4 — Análise de Crédito

**Fase ID (interna):** 67bf10abb38591aeceff8f75
**Posição no funil:** Quarta fase — análise técnica completa de crédito

## O que é esta fase?

Fase central do fluxo de crédito. O analista realiza a análise completa: consulta o painel de alertas de risco, analisa o fluxo de caixa e balanço do cliente, executa o motor de crédito e emite o parecer de crédito. Após o parecer, o card pode ser submetido a alçadas de aprovação (Fase 5) ou ter decisão direta.

## Módulos disponíveis

### 1. Resumo Geral

Mesmos sub-módulos: Visão Geral, Atividades da Etapa, Ficha Cadastral, Histórico.

**Ações:**
- Adicionar cliente
- Etiquetas
- Voltar etapa / Avançar etapa
- Registros e Comentários

---

### 2. AgRisk

Idêntico às fases anteriores. Todos os sub-módulos disponíveis.

---

### 3. Análise de Crédito (MÓDULO PRINCIPAL DESTA FASE)

URL base: `.../credit-analysis/`

#### 3.1 Painel de Alertas

**URL:** `.../credit-analysis/alerts-panel`

Consolida os alertas de risco gerados pelos sistemas de análise.

**Ações:**
- **Processar os dados** — executa o motor de decisão e atualiza os alertas
- Selecionar cliente para análise (campo de seleção)

**Alertas disponíveis (links para detalhe):**
| Alerta | Origem |
|--------|--------|
| Tempo de experiência — Produtor rural | Motor de decisão |
| Restritivos | AgRisk |
| Compliance | AgRisk |
| Judicial | AgRisk |
| Imóveis CAR | AgRisk |

---

#### 3.2 Fluxo de Caixa

**URL:** `.../credit-analysis/cash-flow/consolidated`

Análise do fluxo de caixa agrícola do cliente.

**Ações:**
- **Nova área** — cadastra nova área de produção
- **Cadastrar produção** — registra produção em uma área existente

**Tabs de visualização:**
| Tab | Conteúdo |
|-----|----------|
| Consolidado | Visão consolidada do fluxo de caixa |
| Produções | Detalhamento por produção/cultura |
| Imóveis rurais | Propriedades vinculadas ao fluxo |

---

#### 3.3 Balanço e DRE

**URL:** `.../credit-analysis/balance-sheet`

Análise do balanço patrimonial e Demonstração de Resultado do Exercício.

**Ações:**
- **Processar os dados** — executa análise do balanço
- Selecionar cliente para análise

---

#### 3.4 Motor de Crédito

**URL:** `.../credit-analysis/credit-engine`

Execução do motor de crédito com base nas políticas configuradas.

**Ações:**
- **Classificar cliente** — classifica o cliente dentro da política de crédito
- **Gerar análise** — executa análise completa pelo motor de crédito
- **Validar indicadores** — verifica se todos os indicadores obrigatórios foram preenchidos
- **Analisar cliente** — botão com alerta se indicadores obrigatórios não preenchidos
- Selecionar **política de crédito** (campo de seleção)
- Selecionar **cliente** para análise (campo de seleção)

**Nota:** O botão "Analisar cliente" exibe o estado: "Indicadores obrigatórios não preenchidos" se há pendências.

---

#### 3.5 Parecer de Crédito

**URL:** `.../credit-analysis/credit-opinion`

Emissão do parecer técnico de crédito.

**Ações:**
- **Realizar parecer** — abre formulário para o analista registrar o parecer técnico
- **Gerar análise** — pode gerar análise antes do parecer
- **Classificar cliente** — disponível como ação auxiliar

---

#### 3.6 Aprovações de Alçada (visualização)

**URL:** `.../credit-analysis/approvals` (disponível mas a ação principal fica na Fase 5)

Na Fase 4, este sub-módulo exibe o status:
- "Esta operação não foi submetida a alçada de aprovação" (link para verificar)

---

### 4. Documentos

Idêntico às fases anteriores.

---

## Endpoints principais consumidos

| Endpoint | Descrição |
|----------|-----------|
| `GET /v1/cards/{cardId}/phases/{phaseId}/actions/opinion` | Ações de parecer disponíveis |
| `GET /v1/flows/{flowId}/credit-engine/policies/cards/{cardId}/clients/{clientId}` | Políticas do motor de crédito para o cliente |
| `GET /v1/cards/{cardId}/actions/credit-engine/policies/{policyId}/clients/{clientId}` | Resultado da análise do motor de crédito |
| `GET /v1/cards/{cardId}/actions/credit-engine/policies/{policyId}/clients/{clientId}/inputs` | Inputs/indicadores do motor de crédito |
| `GET /v1/cards/{cardId}/actions/decision-engine/clients/{clientId}` | Resultado do motor de decisão (alertas) |

---

## Padrão de URL

```
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/credit-analysis/alerts-panel
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/credit-analysis/cash-flow/consolidated
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/credit-analysis/balance-sheet
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/credit-analysis/credit-engine
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/credit-analysis/credit-opinion
```

---

## Fluxo esperado nesta fase

1. Verificar alertas no **Painel de Alertas** (Processar os dados)
2. Analisar **Fluxo de Caixa** — cadastrar áreas e produções se necessário
3. Analisar **Balanço e DRE** (Processar os dados)
4. Executar o **Motor de Crédito** — selecionar política, classificar cliente, gerar análise, validar indicadores
5. Emitir o **Parecer de Crédito** (Realizar parecer)
6. Avançar para Fase 5 (Alçadas de Aprovação) se necessário, ou decidir diretamente

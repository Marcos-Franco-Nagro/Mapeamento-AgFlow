# Fase 2 — Validação Documental

**Fase ID (interna):** 67bf1048b38591aeceff8de6
**Posição no funil:** Segunda fase — verificação dos documentos enviados

## O que é esta fase?

O analista valida os documentos enviados pelo solicitante. Se tudo estiver correto, avança para a Análise de Crédito (pulando a fase de pendência). Se faltarem documentos, retrocede ou envia para Pendência Documental.

## Módulos disponíveis

### 1. Resumo Geral

Idêntico à Fase 1, com os mesmos sub-módulos: Visão Geral, Atividades da Etapa, Ficha Cadastral e Histórico.

**Diferenças em relação à Fase 1:**
- Botão **Voltar etapa** (backStep) disponível — pode retornar à Fase 1
- Botão **Avançar etapa** (moveStep) — avança para Fase 3 ou 4
- Ver histórico completo disponível na Visão Geral

**Ações no Resumo Geral:**
- Adicionar cliente
- Adicionar responsável
- Gerenciar Etiquetas
- Voltar etapa / Avançar etapa
- Registros e Comentários
- Ver histórico completo

---

### 2. AgRisk

Idêntico à Fase 1. Todos os sub-módulos disponíveis:
- Cadastro (Consultar, Abrir no AgRisk)
- Sintegra
- Grupos Econômicos
- Restritivos / Compliance / Judicial
- Financeiro / CPRs
- Patrimônio Veicular / Armazéns / Imóveis Rurais

---

### 3. Documentos

Idêntico à Fase 1.

**Ações disponíveis:**
- Novo documento
- Organização por categorias
- Filtro por cliente

---

### 4. Análise de Crédito

Não disponível na Fase 2.

---

## Endpoints principais consumidos

| Endpoint | Descrição |
|----------|-----------|
| `GET /v1/flows/{flowId}` | Configurações do flow |
| `GET /v1/cards/{cardId}/clients` | Clientes da solicitação |
| `GET /v1/cards/{cardId}/fields/phases/{phaseId}` | Campos da fase 2 |
| `GET /v1/cards/{cardId}/history` | Histórico do card |
| `GET /v1/documents/cards/{cardId}` | Documentos vinculados |

---

## Padrão de URL

```
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/summary/overview
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/agrisk/registration
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/documents
```

---

## Fluxo esperado nesta fase

1. Analista verifica os documentos enviados (módulo Documentos)
2. Confere dados cadastrais no AgRisk se necessário
3. Marca atividades concluídas em Atividades da Etapa
4. Avança para Fase 4 (Análise de Crédito) se documentação ok, ou envia para Fase 3 (Pendência Documental)

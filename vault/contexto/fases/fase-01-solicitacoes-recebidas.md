# Fase 1 — Solicitações Recebidas

**Fase ID (interna):** 67bf0e91b38591aeceff84a8
**Posição no funil:** Fase de entrada — todas as novas solicitações chegam aqui

## O que é esta fase?

É a porta de entrada do funil de crédito. O analista recebe a solicitação, consulta os dados de risco do cliente no AgRisk e verifica se a documentação pode avançar para validação.

## Módulos disponíveis

### 1. Resumo Geral

Visão consolidada do card da solicitação.

**Sub-módulos:**

| Sub-módulo | URL | O que mostra |
|------------|-----|--------------|
| Visão Geral | `.../summary/overview` | Dados gerais, clientes vinculados, responsável, etiquetas |
| Atividades da Etapa | `.../summary/stages` | Checklist de atividades por fase com upload de arquivos |
| Ficha Cadastral | `.../summary/registration` | Dados cadastrais preenchidos no formulário da solicitação |
| Histórico | `.../summary/history` | Log de todas as ações realizadas no card |

**Ações disponíveis no Resumo Geral:**
- Adicionar cliente à solicitação
- Adicionar responsável
- Gerenciar Etiquetas (tags do card)
- Avançar etapa (moveStep) — envia para Fase 2
- Registros e Comentários (abas)
- Upload de arquivos nas atividades da etapa (Adicionar novo arquivo)
- Salvar alterações

---

### 2. AgRisk

Módulo de consulta de dados de risco do cliente via integração com o sistema AgRisk.

**Estrutura de sub-módulos:**

#### Consulta (Cadastro)
- URL: `.../agrisk/registration`
- Ação principal: **Consultar** — dispara consulta do cliente no AgRisk
- Visualização: Endereços, Telefones, Emails (tabs)
- Link direto: **Abrir no AgRisk**

#### Sintegra
- URL: `.../agrisk/sintegra`
- Situação fiscal estadual do cliente

#### Grupos Econômicos
- URL: `.../agrisk/economic-group`
- Vínculos empresariais e grupos do cliente

#### Restrições

| Sub-módulo | URL | Conteúdo |
|------------|-----|----------|
| Restritivos | `.../agrisk/restrictive` | Restrições cadastrais (SPC, Serasa etc.) |
| Compliance | `.../agrisk/compliance` | Análise de compliance regulatório |
| Judicial | `.../agrisk/judicial` | Ocorrências judiciais |

#### Endividamento

| Sub-módulo | URL | Conteúdo |
|------------|-----|----------|
| Financeiro | `.../agrisk/cash-flow` | Endividamento financeiro; ação: Consultar, Autorização |
| CPRs | `.../agrisk/cpr` | Cédulas de Produto Rural registradas |

#### Patrimônio

| Sub-módulo | URL | Conteúdo |
|------------|-----|----------|
| Patrimônio Veicular | `.../agrisk/vehicles` | Veículos do cliente |
| Armazéns | `.../agrisk/warehouse` | Armazéns vinculados |
| Imóveis Rurais (CAR) | `.../agrisk/rural-properties-car` | Propriedades rurais com registro CAR |

---

### 3. Documentos

URL: `.../documents`

**Ações disponíveis:**
- **Novo documento** — cria/solicita novo documento
- Filtrar por cliente (campo de busca)
- Organização por categorias: Documentos Gerais, Imagens, Documentos Criados

---

### 4. Análise de Crédito

Não disponível na Fase 1. O menu aparece mas não oferece ações nesta etapa.

---

## Endpoints principais consumidos

| Endpoint | Descrição |
|----------|-----------|
| `GET /v1/flows/{flowId}` | Carrega configurações do flow |
| `GET /v1/cards/{cardId}/clients` | Clientes da solicitação |
| `GET /v1/cards/{cardId}/fields/phases/{phaseId}` | Campos configurados para a fase |
| `GET /v1/cards/{cardId}/history` | Histórico do card |
| `GET /v1/agrisk/products` | Produtos disponíveis no AgRisk |
| `GET /v1/clients/{clientId}` | Dados cadastrais do cliente |
| `GET /v1/agrisk/debt/{clientId}` | Dados de endividamento |
| `GET /v1/documents/cards/{cardId}` | Documentos vinculados ao card |

---

## Padrão de URL completo

```
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/summary/overview
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/agrisk/registration
https://agflow.agrisk.dev/pt/flow/67bf0dccb38591aeceff8121/card/{cardId}/documents
```

---

## Fluxo esperado nesta fase

1. Analista recebe a solicitação e visualiza o Resumo Geral
2. Consulta os dados de risco no módulo AgRisk (Cadastro → Financeiro → Restrições → Patrimônio)
3. Verifica documentação em Documentos
4. Preenche as atividades da etapa (Atividades da Etapa)
5. Avança o card para Fase 2 (Validação Documental)

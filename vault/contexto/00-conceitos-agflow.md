---
tipo: glossario
descricao: "Glossário completo dos conceitos do AgFlow — leia quando precisar entender o que é um Flow, Phase, Card, Action, Engine, etc."
tags: [conceitos, glossario, agflow]
---

# Glossário de Conceitos AgFlow

Referência semântica para entender e explicar o AgFlow corretamente em bug reports e documentação de QA.

---

## Estrutura Principal

### Flow (Funil)
Um **flow** é um funil de crédito — o equivalente a um pipeline de vendas, mas para análise de crédito. Cada empresa pode ter múltiplos flows, geralmente organizados por tipo de cliente (Pessoa Física, Pessoa Jurídica, Balcão, etc.).

- Identificado por um **Flow ID** (string hexadecimal, ex: `67bf0dccb38591aeceff8121`)
- Tem um nome, cor e ícone configuráveis
- Define as fases (colunas kanban), o start form e os engines
- A URL de acesso segue o padrão: `/pt/flow/{flowId}/board`

### Card (Solicitação)
Um **card** representa uma solicitação de crédito individual. É criado quando alguém preenche o Start Form. Contém todos os dados do cliente e avança pelas fases conforme a análise progride.

- Cada card tem um **Card ID** único
- Pertence sempre a uma fase do flow
- Tem clientes vinculados, documentos, histórico e campos preenchidos

### Phase (Fase / Etapa)
Uma **phase** é uma etapa do funil de crédito — equivale a uma coluna no kanban. O card percorre as fases da análise até chegar a uma fase terminal (aprovado ou reprovado).

**Fases padrão do AgFlow:**
1. Solicitações Recebidas (fase de entrada)
2. Validação Documental
3. Pendência Documental
4. Análise de Crédito
5. Alçadas de Aprovação
6. Crédito Aprovado (fase terminal — DONE)
7. Crédito Reprovado (fase terminal — DONE)

Cada fase pode ser configurada como START (entrada) ou DONE (saída). Empresas podem adicionar fases extras (ex: "Aguardando SCR", "Renegociação Pendente").

### Start Form (Formulário de Entrada)
O **start form** é o formulário que inicia uma solicitação de crédito. É preenchido pelo vendedor/analista ao criar um novo card. Define os dados básicos como nome do cliente, CPF/CNPJ, valor solicitado e documentos iniciais.

Campos típicos de um start form:
- Nome do cliente (`default_name`)
- CPF/CNPJ (`default_document`)
- Valor solicitado (`default_value`)
- Dados do consultor de vendas (`shortText`, `email`, `phone`)
- Documentos iniciais (`attachment`)

---

## Campos e Tipos

### Field (Campo)
Um **campo** é um elemento de formulário dentro de uma fase. Cada campo tem:
- **Label** — nome visível (ex: "Valor Solicitado")
- **Type** — tipo técnico da API (ex: `default_value`)
- **Required** — se é obrigatório
- **Rules** — regras condicionais que controlam visibilidade e obrigatoriedade

Os IDs de campos aparecem como hashes curtos (ex: `15e5ac27`). Esses IDs são gerados pelo AgFlow e usados nas regras condicionais.

### Regras Condicionais (Conditional Rules)
Regras do tipo **SE condição → ação** que automatizam o comportamento dos campos. Exemplos:
- SE `campo_estado_civil` = "Casado" → mostrar `campo_conjuge`, tornar obrigatório
- SE `campo_area_arrendada` > "0" → mostrar `campo_contrato_arrendamento`
- SE `campo_documentacao_ok` = "Não" → mostrar `campo_justificativa`

Ações possíveis: `show`, `hide`, `setRequired`, `setOptional`, `setValue`, `clearValue`

### Verificador (Checker Field)
Um **verificador** é um campo especial do tipo `shortText` que funciona como flag de controle. Recebe valor "ok" ou "pendente" via regras condicionais para indicar se uma seção está completa. O "Verificador Geral da Fase" consolida o status de todos os verificadores parciais.

---

## Automação e Engines

### Action (Ação de Fase)
Uma **action** é uma automação que dispara quando um card entra em uma fase. Pode enviar mensagens (WhatsApp/e-mail), acionar engines, gerar documentos ou executar outras operações automáticas.

### Trigger
Um **trigger** define quando uma action é executada. Pode ser:
- `onEnter` — ao entrar na fase
- `onChange` — ao alterar um campo
- `onExit` — ao sair da fase

### Motor de Crédito (Credit Engine)
O **motor de crédito** é um engine que calcula automaticamente um score ou limite de crédito para o cliente, com base em variáveis preenchidas nos campos do card. É configurado com políticas (`policies`) que definem as regras de cálculo.

Para usar: o analista seleciona a política aplicável e clica em "Gerar análise". O motor processa os indicadores e retorna um resultado.

Endpoint: `GET /v1/flows/{flowId}/credit-engine/policies/cards/{cardId}/clients/{clientId}`

### Motor de Decisão (Decision Engine)
O **motor de decisão** executa uma lógica binária (pode/não pode) sobre os dados do card, gerando uma recomendação automática de aprovação ou reprovação. Diferente do motor de crédito, que calcula valores, o motor de decisão emite um veredito.

### AgRisk
O **AgRisk** é o módulo de análise de risco integrado ao AgFlow. Permite consultar dados externos sobre o cliente:
- **Cadastro** — dados cadastrais e situação fiscal
- **Sintegra** — situação estadual (inscrição estadual)
- **Restritivos** — protestos, negativações, dívidas
- **Compliance** — análise de compliance e PEP
- **Judicial** — processos e ocorrências judiciais
- **Grupos Econômicos** — vínculos e grupo econômico do cliente
- **CPRs** — Cédulas de Produto Rural registradas
- **Cash Flow** — endividamento e autorização de consulta SCR
- **Patrimônio Veicular** — veículos do cliente
- **Armazéns** — armazéns vinculados
- **Imóveis Rurais (CAR)** — propriedades rurais

### Parecer de Crédito (Credit Opinion)
O **parecer** é a avaliação qualitativa do analista sobre a operação de crédito. É preenchido manualmente e registrado no card como documento de análise.

### Alçada de Aprovação (Approval Tier)
Uma **alçada** é o nível hierárquico de aprovação necessário para uma operação de crédito. Operações de maior valor exigem aprovação de níveis mais altos (ex: analista → gerente → diretor). Configurada na fase "Alçadas de Aprovação".

---

## Usuários e Permissões

### Roles (Funções)
As **roles** definem as permissões de cada usuário no AgFlow. Roles padrão:
- **assistente** — acesso básico, preenchimento de formulários
- **analista** — análise de crédito e movimentação de cards
- **gerente** — aprovação de alçadas de nível intermediário
- **diretor** — aprovação de alçadas de nível máximo

### CTV (Consultor Técnico de Vendas)
O **CTV** é o vendedor de campo que abre as solicitações de crédito para os clientes da empresa. Nos flows com lógica de CTV, o start form tem um campo `select` com a lista de consultores, e ao selecionar um nome os campos de e-mail e telefone são preenchidos automaticamente.

---

## Conceitos de Negócio Agrícola

### Safra
Ciclo anual de cultivo. As solicitações de crédito geralmente são vinculadas a uma safra específica (ex: safra 2025/2026).

### CAR (Cadastro Ambiental Rural)
Registro obrigatório para propriedades rurais. Usado no AgRisk para validar a situação ambiental do imóvel dado em garantia.

### CPR (Cédula de Produto Rural)
Título de crédito rural que representa a promessa de entrega futura de produto agrícola. Usado como instrumento de financiamento no agronegócio.

### SCR (Sistema de Informações de Crédito do Banco Central)
Sistema do Banco Central que registra todas as operações de crédito acima de R$ 200. Consultar o SCR requer autorização do cliente. Aparece no AgRisk como "Cash Flow".

### Barter
Operação onde o produtor troca produção futura (soja, milho, etc.) por insumos agrícolas (sementes, defensivos, fertilizantes). Comum no agronegócio brasileiro.

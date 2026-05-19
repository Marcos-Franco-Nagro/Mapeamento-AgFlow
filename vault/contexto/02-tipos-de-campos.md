---
tipo: referencia
descricao: "Referência completa de tipos de campo da API AgFlow — use para saber qual tipo usar para cada dado"
tags: [campos, tipos, api, agflow]
---

# Tipos de Campos AgFlow — Referência Completa

Todo campo no AgFlow tem um `type` que define como ele se comporta na interface e na API. Use esta referência para mapear o dado de negócio ao tipo correto.

---

## Campos Padrão (default_*)

Esses tipos são especiais — têm comportamento nativo na plataforma.

| Tipo | Nome | Quando usar | Exemplo |
|---|---|---|---|
| `default_name` | Nome/Razão Social | Campo principal de identificação do card. Aparece no título do card no kanban. | "Nome do cliente", "Razão Social" |
| `default_document` | CPF/CNPJ | Documento fiscal com máscara automática. Aceita CPF (11 dígitos) ou CNPJ (14). | "CPF do cliente", "CNPJ da empresa" |
| `default_value` | Valor em R$ | Campo monetário com formatação BRL. Representa o valor financeiro principal da operação. | "Valor Solicitado", "Limite de Crédito" |
| `default_company_branch_select` | Filial da Empresa | Select dinâmico que lista as filiais cadastradas da empresa no AgFlow. | "Filial", "Unidade de Atendimento" |

---

## Campos de Texto

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `shortText` | Texto curto de linha única. CEP, código, observação breve, campos de verificação interna. | "CEP", "Número", "Código externo" |
| `longText` | Texto longo, área de texto livre. Observações, pareceres, comentários, georreferenciamento. | "Observações Iniciais", "Parecer do analista", "Justificativa" |
| `email` | E-mail com validação de formato. | "E-mail do cliente", "E-mail do CTV" |

---

## Campos Numéricos

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `number` | Números sem máscara monetária. Áreas em hectares, quantidades, percentuais. | "Área Plantada (ha)", "Quantidade de Sacas" |

---

## Campos de Data e Tempo

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `date` | Data com seleção de calendário. | "Data de nascimento", "Data de vencimento" |

---

## Campos de Seleção

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `select` | Dropdown de seleção única. O analista escolhe uma opção de uma lista predefinida. | "Estado Civil", "UF", "Aprovador de Crédito" |
| `checkList` | Seleção múltipla. O analista pode marcar várias opções. | "Culturas Pretendidas", "Relacionamento Bancário" |

---

## Campos de Contato

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `phone` | Telefone com máscara internacional. Aceita DDD + número. Usado para envio de WhatsApp. | "Telefone do cliente", "WhatsApp para avisos" |

---

## Campos de Arquivo

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `attachment` | Upload de arquivos (PDF, imagem, Word). Documentos, certidões, balanços, fotos. | "CPF/CNH", "Balanço Patrimonial", "Contrato de Arrendamento" |

---

## Regra de Mapeamento Rápido

Quando uma descrição de bug menciona um campo em linguagem natural, use esta chave:

| O usuário diz... | Tipo correto |
|---|---|
| Nome do cliente / Razão Social | `default_name` |
| CPF / CNPJ / Documento | `default_document` |
| Valor / Crédito / Limite / R$ | `default_value` |
| Filial / Unidade | `default_company_branch_select` |
| Texto curto / código / CEP / número da rua | `shortText` |
| Observação / parecer / comentário longo | `longText` |
| E-mail | `email` |
| Telefone / WhatsApp | `phone` |
| Área (ha) / quantidade / número | `number` |
| Data / prazo | `date` |
| Lista de uma opção / dropdown | `select` |
| Lista de múltiplas opções | `checkList` |
| Documento / PDF / foto / arquivo | `attachment` |

---

## Campos Internos de Controle

Alguns campos não são preenchidos pelo analista — são usados internamente pelo sistema:

| Tipo | Descrição |
|---|---|
| `shortText` com label "✅ Verificador" | Campo de controle que recebe "ok" ou "pendente" via regras. Indica se uma seção está completa. |
| `select` com label "Aprovador de Crédito" | Campo que registra quem aprovou a operação. |
| `select` com label "Limite de Crédito" | Campo que registra o limite aprovado na fase final. |

# Contexto — Documentação Geral do AgFlow

Esta pasta contém a documentação conceitual do AgFlow para dar contexto ao projeto de QA. Diferente de `vault/endpoints/` (que documenta chamadas de API capturadas pelo crawler), aqui estão os conceitos, telas e estrutura do produto.

## Arquivos

| Arquivo | O que contém |
|---------|-------------|
| `00-conceitos-agflow.md` | Glossário completo: Flow, Card, Phase, Action, Engine, AgRisk, Alçada, etc. |
| `01-mapa-telas.md` | Todas as telas, módulos, URLs e endpoints principais do AgFlow |
| `02-tipos-de-campos.md` | Referência de tipos de campo da API (default_name, shortText, attachment, etc.) |
| `fases/fase-01-*.md` | Documentação detalhada de cada uma das 7 fases do funil |

## Como usar

Quando receber uma descrição de bug, consulte:

1. **Qual fase?** → `01-mapa-telas.md` ou a pasta `fases/`
2. **Qual módulo/tela?** → `01-mapa-telas.md` (seção Rotas por módulo)
3. **O que significa o termo X?** → `00-conceitos-agflow.md`
4. **Qual tipo de campo está com bug?** → `02-tipos-de-campos.md`
5. **Qual endpoint está falhando?** → `vault/endpoints/` (capturado pelo crawler)

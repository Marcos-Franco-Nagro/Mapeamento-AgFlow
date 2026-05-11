// Rotas de nível de flow (não são de card) — Board, Tabela, Formulário
// Módulos e tópicos de card foram migrados para navigation-map.ts

export interface FlowRouteDef {
  slug: string;
  name: string;
}

export const FLOW_ROUTES: FlowRouteDef[] = [
  { slug: 'board', name: 'Quadro (Board)' },
  { slug: 'table', name: 'Tabela' },
  { slug: 'form',  name: 'Formulário (StartForm)' },
];

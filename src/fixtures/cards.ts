// Cards seed — um por fase do flow Solicitações de Crédito
// ID do flow: 67bf0dccb38591aeceff8121
// Todos os cards abaixo têm 2+ clientes (habilitam visão de grupo no AgRisk)
// Atualizado em 08/05/2026

export const FLOW_ID = '67bf0dccb38591aeceff8121';

export interface CardFixture {
  phase: number;
  phaseName: string;
  cardId: string;
  url: string;
}

const BASE = 'https://agflow.agrisk.dev/pt';

function cardUrl(cardId: string): string {
  return `${BASE}/flow/${FLOW_ID}/card/${cardId}/summary/overview`;
}

export const CARD_FIXTURES: CardFixture[] = [
  {
    phase: 1,
    phaseName: 'Solicitações Recebidas',
    cardId: '69fdf5312c973ce220c447e7',
    url: cardUrl('69fdf5312c973ce220c447e7'),
  },
  {
    phase: 2,
    phaseName: 'Validação Documental',
    cardId: '69fdf5492c973ce220c44844',
    url: cardUrl('69fdf5492c973ce220c44844'),
  },
  {
    phase: 3,
    phaseName: 'Pendência Documental',
    cardId: '69fe1d512c973ce220c49757',
    url: cardUrl('69fe1d512c973ce220c49757'),
  },
  {
    phase: 4,
    phaseName: 'Análise de Crédito',
    cardId: '69fdf5782c973ce220c44940',
    url: cardUrl('69fdf5782c973ce220c44940'),
  },
  {
    phase: 5,
    phaseName: 'Alçadas de Aprovação',
    cardId: '69fdf6192c973ce220c45316',
    url: cardUrl('69fdf6192c973ce220c45316'),
  },
  {
    phase: 6,
    phaseName: 'Crédito Aprovado',
    cardId: '69fdf72b2c973ce220c45ead',
    url: cardUrl('69fdf72b2c973ce220c45ead'),
  },
  {
    phase: 7,
    phaseName: 'Crédito Reprovado',
    cardId: '69fdf7c72c973ce220c469c3',
    url: cardUrl('69fdf7c72c973ce220c469c3'),
  },
];

// Card com todos os módulos habilitados (usar como representativo)
export const CARD_PHASE_4 = CARD_FIXTURES[3];

// Converte número e nome da fase para slug de pasta do vault.
// fase 0 = rotas de nível de flow (board, table, form)
export function getPhaseSlug(phase: number, phaseName: string): string {
  if (phase === 0) return 'fase-0-flow';
  const nameSlug = phaseName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `fase-${phase}-${nameSlug}`;
}

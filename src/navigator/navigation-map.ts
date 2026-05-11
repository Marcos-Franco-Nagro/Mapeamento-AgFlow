// Mapa completo de navegação do AgFlow.
// Slugs marcados confirmed:true foram verificados na barra de endereço do browser.
// Slugs sem confirmed são palpites por convenção — validar na próxima execução.
//
// IMPORTANTE: tópicos do AgRisk ficam diretamente sob agrisk/ (sem prefixo individual/).
// O prefixo individual/ não existe na URL real — o app o ignora e fica em registration.
// A visão de grupo usa agrisk/group/ (confirmado).

export interface NavNode {
  slug: string;
  label: string;
  enabledInPhases: number[];
  children?: NavNode[];
  requires?: 'multi-client';
  needsClientId?: boolean;
  confirmed?: boolean;
}

const ALL_PHASES = [1, 2, 3, 4, 5, 6, 7];

export const AGFLOW_NAV_MAP: NavNode[] = [
  {
    slug: 'summary',
    label: 'Resumo Geral',
    enabledInPhases: ALL_PHASES,
    children: [
      { slug: 'overview',     label: 'Visão Geral',         enabledInPhases: ALL_PHASES, confirmed: true },
      { slug: 'stages',       label: 'Atividades da Etapa', enabledInPhases: ALL_PHASES, confirmed: true },
      { slug: 'registration', label: 'Ficha Cadastral',     enabledInPhases: ALL_PHASES, confirmed: true },
      { slug: 'history',      label: 'Histórico',           enabledInPhases: ALL_PHASES, confirmed: true },
    ],
  },
  {
    slug: 'agrisk',
    label: 'AgRisk',
    enabledInPhases: ALL_PHASES,
    children: [
      // Tópicos individuais — diretamente sob agrisk/ (confirmado: sem prefixo individual/)
      { slug: 'registration',   label: 'Cadastro',            enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'sintegra',       label: 'Sintegra',            enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'economic-group', label: 'Grupos',              enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'restrictives',   label: 'Restritivos',         enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'compliance',     label: 'Compliance',          enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'judicial',       label: 'Judicial',            enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'cash-flow',      label: 'Financeiro',          enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'cpr',            label: 'CPRs',                enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'vehicles',       label: 'Patrimônio Veicular', enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      { slug: 'warehouse',      label: 'Armazéns',            enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
      {
        slug: 'rural-properties',
        label: 'Imóveis Rurais',
        enabledInPhases: ALL_PHASES,
        children: [
          { slug: 'car',    label: 'CAR',    enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
          { slug: 'simple', label: 'Simples', enabledInPhases: ALL_PHASES, confirmed: true, needsClientId: true },
        ],
      },
      // Visão de Grupo — requer card com 2+ clientes e HAS_GROUP=true
      {
        slug: 'group',
        label: 'Grupo',
        enabledInPhases: ALL_PHASES,
        requires: 'multi-client',
        children: [
          { slug: 'members',         label: 'Integrantes',              enabledInPhases: ALL_PHASES, confirmed: true },
          { slug: 'restrictives',   label: 'Restrições',               enabledInPhases: ALL_PHASES, confirmed: true },
          { slug: 'compliance',     label: 'Compliance',               enabledInPhases: ALL_PHASES, confirmed: true },
          { slug: 'car',            label: 'Imóveis CAR',              enabledInPhases: ALL_PHASES, confirmed: true },
          { slug: 'financial-debts',label: 'Endividamento Financeiro', enabledInPhases: ALL_PHASES, confirmed: true },
          { slug: 'cpr',            label: 'CPRs',                     enabledInPhases: ALL_PHASES, confirmed: true },
        ],
      },
    ],
  },
  {
    slug: 'credit-analysis',
    label: 'Análise de Crédito',
    enabledInPhases: [1, 2, 4, 5, 6, 7], // desabilitado na fase 3
    children: [
      { slug: 'radar',           label: 'Painel de alertas',    enabledInPhases: [4, 5, 6, 7], confirmed: true },
      {
        slug: 'cash-flow',
        label: 'Fluxo de caixa',
        enabledInPhases: [1, 2, 4, 5, 6, 7],
        children: [
          { slug: 'consolidated',     label: 'Consolidado',    enabledInPhases: [1, 2, 4, 5, 6, 7], confirmed: true },
          { slug: 'productions',      label: 'Produções',      enabledInPhases: [1, 2, 4, 5, 6, 7], confirmed: true },
          { slug: 'rural-properties', label: 'Imóveis rurais', enabledInPhases: [1, 2, 4, 5, 6, 7], confirmed: true },
        ],
      },
      { slug: 'credit-engine',   label: 'Motor de crédito',     enabledInPhases: [4, 5, 6, 7] },
      { slug: 'financial-report',label: 'Balanço e DRE',        enabledInPhases: [1, 2, 4], confirmed: true },
      { slug: 'credit-opinion',  label: 'Parecer de crédito',   enabledInPhases: [4, 5, 6, 7], confirmed: true },
      { slug: 'approves', label: 'Aprovações de alçada', enabledInPhases: [5, 6, 7], confirmed: true },
    ],
  },
  {
    slug: 'documents',
    label: 'Documentos',
    enabledInPhases: ALL_PHASES,
    confirmed: true,
  },
];

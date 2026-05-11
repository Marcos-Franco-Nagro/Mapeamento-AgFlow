// Definição dos modais que precisam de clique para abrir (não têm URL própria)

export interface ModalTrigger {
  testId?: string;
  text?: string;
  ariaLabel?: string;
}

export interface FormFill {
  label: string;              // texto do label MUI (getByLabel, exact: false)
  value: string;              // valor de teste — suporta token {runSuffix} para nome incremental
  confirmWithEnter?: boolean; // pressionar Enter após digitar — necessário em chip inputs (ex: CPF)
}

export interface ModalDef {
  slug: string;
  name: string;
  description: string;
  triggerUrl: string;
  trigger: ModalTrigger;
  waitSelector?: string;         // seletor CSS a aguardar após clique — default: [role="dialog"]
  fillForm?: FormFill[];         // campos a preencher antes do screenshot final
  useRunCounter?: boolean;       // habilita {runSuffix} nos valores → "" run 1, " 2" run 2, ...
  submit?: { buttonText: string }; // botão a clicar após screenshot, para capturar endpoint POST
}

const BASE_URL = process.env.BASE_URL ?? 'https://agflow.agrisk.dev';
const LOCALE = process.env.LOCALE ?? 'pt';
const FLOW_ID = '67bf0dccb38591aeceff8121';
const CARD_FASE4 = '69e8cbbdd279a26f4bc8c376';

export const MODALS: ModalDef[] = [
  {
    slug: 'nova-solicitacao',
    name: 'Mini StartForm — Nova Solicitação',
    description: 'Modal de criação rápida de card, aberto pelo botão "Nova solicitação" no Board',
    triggerUrl: `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/board`,
    trigger: { text: 'Nova solicitação' },
    useRunCounter: true,
    fillForm: [
      // {runSuffix} → "" no run 1, " 2" no run 2, " 3" no run 3, ...
      { label: 'Nome Completo do Cliente', value: 'marcos - mapeando agflow{runSuffix}' },
      // CPF usa chip input — precisa de Enter para confirmar o valor inserido
      { label: 'CPF', value: '700.420.646-78', confirmWithEnter: true },
      { label: 'Valor de crédito solicitado', value: '100000' },
    ],
    submit: { buttonText: 'Criar' },
  },
  {
    slug: 'move-step',
    name: 'Avançar Etapa',
    description: 'Modal de avanço de etapa, aberto pelo botão moveStep em Atividades da Etapa',
    triggerUrl: `${BASE_URL}/${LOCALE}/flow/${FLOW_ID}/card/${CARD_FASE4}/summary/stages`,
    trigger: { testId: 'moveStep' },
  },
];

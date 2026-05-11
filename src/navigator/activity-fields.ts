// Definições de campos por fase para o script de "Atividades da Etapa".
// Cada fase futura terá seu próprio array PHASE{N}_FIELDS aqui.

import type { Page } from 'playwright';
import {
  fillNumericField,
  fillTextareaField,
  selectDropdown,
  isFieldFilled,
  isUploadFilled,
  uploadFileViaPopup,
} from './agflow-helpers.js';

export interface ActivityFieldDef {
  dataCy: string;
  type: 'number' | 'dropdown' | 'upload' | 'textarea';
  value: string | number;
  folder?: string; // apenas para type: 'upload'
}

const FIXTURE_PNG = './tests/fixtures/Minha_assinatura_email.png';

// Fase 2 — Validação Documental: dropdown + textarea
export const PHASE2_FIELDS: ActivityFieldDef[] = [
  { dataCy: 'input-documentacao_ok',                    type: 'dropdown', value: 'Não' },
  { dataCy: 'input-informe_a_pendencia_documental',      type: 'textarea', value: 'Marcos - mapeamento fase 2' },
];

// Fase 3 — Pendência Documental: 1 campo de upload
export const PHASE3_FIELDS: ActivityFieldDef[] = [
  { dataCy: 'input-documentos_pendentes_enviados_pelo_ctv', type: 'upload', value: FIXTURE_PNG, folder: 'Imagens' },
];

// Fase 5 — Alçadas de Aprovação: 1 dropdown
// "Manter" mantém o card na fase; "Seguir" move automaticamente para Crédito Reprovado
export const PHASE5_FIELDS: ActivityFieldDef[] = [
  { dataCy: 'input-trigger_reprovacao', type: 'dropdown', value: 'Manter' },
];

// Fase 1 — Solicitações Recebidas: 3 campos de upload de documentos
export const PHASE1_FIELDS: ActivityFieldDef[] = [
  { dataCy: 'input-documento_pessoal_do_cliente', type: 'upload', value: FIXTURE_PNG, folder: 'Imagens' },
  { dataCy: 'input-contrato_de_arrendamento',     type: 'upload', value: FIXTURE_PNG, folder: 'Imagens' },
  { dataCy: 'input-documentos_adicionais',        type: 'upload', value: FIXTURE_PNG, folder: 'Imagens' },
];

// Fase 4 — Análise de Crédito: 10 campos obrigatórios
// Valores = happy path para automação (scores mínimos, sem julgamento de negócio)
export const PHASE4_FIELDS: ActivityFieldDef[] = [
  { dataCy: 'input-relacionamento_com_o_cliente_em_anos', type: 'number',   value: '1' },
  { dataCy: 'input-area_de_primeiro_ano_ha',              type: 'number',   value: '1' },
  { dataCy: 'input-disponibilidade_de_garantias',         type: 'number',   value: '1' },
  {
    dataCy: 'input-nivel_de_educacao',
    type: 'dropdown',
    value: 'Ausência de educação especializada',
  },
  {
    dataCy: 'input-tempo_de_atraso',
    type: 'dropdown',
    value: 'Antecipado e/ou Pontual',
  },
  {
    dataCy: 'input-referencias_comerciais',
    type: 'dropdown',
    value: 'Ausência de referências sobre o cliente. Somente parecer do CTV',
  },
  {
    dataCy: 'input-restricoes_de_credito',
    type: 'dropdown',
    value: 'Apresenta restrições importantes',
  },
  {
    dataCy: 'input-informacoes_do_maquinario',
    type: 'dropdown',
    value: 'Todo o maquinário utilizado é contratado de terceiros',
  },
  {
    dataCy: 'input-tipos_de_garantias_disponiveis',
    type: 'dropdown',
    value: '100% da negociação em CPR de 1º grau + fechamento do grão + Seguro Agrícola (Barter 1ª linha)',
  },
  {
    dataCy: 'input-relacionamento_com_o_produtor',
    type: 'dropdown',
    value: 'Mostra oposição a assinatura de documentos (duplicatas, CCVs, ficha cadastral)',
  },
];

// Retorna a contagem de campos efetivamente preenchidos nesta sessão (campos já preenchidos são pulados).
export async function fillActivityFields(
  page: Page,
  fields: ActivityFieldDef[],
): Promise<number> {
  let filled = 0;
  for (const field of fields) {
    if (field.type === 'upload') {
      if (await isUploadFilled(page, field.dataCy)) continue;
      await uploadFileViaPopup(page, field.dataCy, String(field.value), field.folder ?? 'Imagens');
    } else {
      // Pula campo já preenchido — evita re-selecionar mesma opção (MUI não fecha dropdown)
      if (await isFieldFilled(page, field.dataCy)) continue;
      if (field.type === 'number') {
        await fillNumericField(page, field.dataCy, field.value);
      } else if (field.type === 'textarea') {
        await fillTextareaField(page, field.dataCy, String(field.value));
      } else {
        await selectDropdown(page, field.dataCy, String(field.value));
      }
    }
    filled++;
  }
  return filled;
}

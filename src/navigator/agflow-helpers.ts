// Helpers genéricos para interação com campos do AgFlow (MUI customizado).
// Reutilizáveis em todos os scripts de atividades — não são específicos de fase.

import type { Page } from 'playwright';
import { expect } from '@playwright/test';

// O botão correto é sempre data-step-variant="info" (próxima fase normal).
// NUNCA clicar em success (aprovado direto) ou danger (reprovado direto).
export async function advanceToNextPhase(page: Page, expectedLabel: string): Promise<boolean> {
  await page.locator('[data-testid="moveStep"]:not([disabled])').click();
  await expect(page.getByRole('heading', { name: 'Avançar etapas' })).toBeVisible({ timeout: 8000 });

  const targetButton = page.locator('[data-step-variant="info"]');
  const buttonText = await targetButton.textContent();
  console.log(`    Avançando para: "${buttonText?.trim()}"`);

  // Salvaguarda: confirma o texto antes de clicar
  await expect(targetButton).toContainText(expectedLabel);
  await targetButton.click();

  try {
    await expect(
      page.locator('[data-step-active="true"]').or(page.getByText(expectedLabel)),
    ).toBeVisible({ timeout: 10000 });
    return true;
  } catch {
    return false;
  }
}

export async function fillNumericField(
  page: Page,
  dataCy: string,
  value: string | number,
): Promise<void> {
  const input = page.locator(`[data-cy="${dataCy}"] input[type="number"]`);
  // pressSequentially dispara eventos de teclado reais, garantindo que o React onChange dispare
  await input.click({ clickCount: 3 }); // seleciona tudo
  await input.pressSequentially(String(value));
  await input.blur();
}

// Dropdowns do AgFlow são MUI Selects com role="combobox" — page.selectOption() não funciona.
export async function selectDropdown(
  page: Page,
  dataCy: string,
  optionText: string,
): Promise<void> {
  const combobox = page.locator(`[data-cy="${dataCy}"] [role="combobox"]`);
  await expect(combobox).toBeVisible();
  await expect(combobox).not.toHaveClass(/Mui-disabled/);
  await combobox.click();

  const listbox = page.getByRole('listbox');
  await listbox.waitFor({ state: 'visible' });

  // Move o mouse para o canto da listbox antes de clicar na opção —
  // dissipa o tooltip MUI que intercepta eventos quando o mouse passa sobre opções longas
  const listboxBox = await listbox.boundingBox();
  if (listboxBox) {
    await page.mouse.move(listboxBox.x + 4, listboxBox.y + 4);
    await page.waitForTimeout(250);
  }

  // exact: true evita match parcial em opções com prefixos comuns
  await page.getByRole('option', { name: optionText, exact: true }).click();

  await page.waitForTimeout(200);
  // MUI não fecha o dropdown ao re-selecionar opção já selecionada — fechar com Escape
  if ((await combobox.getAttribute('aria-expanded')) === 'true') {
    await page.keyboard.press('Escape');
  }
  await expect(combobox).toHaveAttribute('aria-expanded', 'false');
}

export async function isFieldFilled(page: Page, dataCy: string): Promise<boolean> {
  // Dropdowns MUI: o input[aria-hidden] guarda o valor real mesmo quando pré-populado do DB.
  // Não usar aria-invalid — começa como "true" em campos já salvos até o usuário interagir.
  const hiddenInput = page.locator(`[data-cy="${dataCy}"] input[aria-hidden="true"]`);
  if ((await hiddenInput.count()) > 0) {
    const value = await hiddenInput.inputValue();
    return value !== '';
  }
  // Inputs numéricos
  const input = page.locator(`[data-cy="${dataCy}"] input`);
  const value = await input.inputValue();
  return value !== '' && value !== '0';
}

export async function isUploadFilled(page: Page, dataCyPrefix: string): Promise<boolean> {
  const thumbnail = page.locator(`[data-cy^="${dataCyPrefix}"] [data-testid="imageThumbnail"]`);
  return (await thumbnail.count()) > 0;
}

export async function uploadFileViaPopup(
  page: Page,
  dataCyPrefix: string,
  filePath: string,
  folderName: string = 'Imagens',
): Promise<void> {
  const fieldContainer = page.locator(`[data-cy^="${dataCyPrefix}"]`);
  await expect(fieldContainer).toBeVisible();

  await fieldContainer.getByText('Adicionar novo arquivo').click();

  await expect(page.getByText('Adicione um novo documento clicando no botão abaixo'))
    .toBeVisible({ timeout: 10000 });

  // Aguardar DOM do popup estabilizar antes de interagir
  await page.waitForTimeout(800);

  // O popup renderiza o input por último no DOM — .last() pega o do popup.
  // setInputFiles funciona mesmo em inputs hidden, bypass do file dialog nativo.
  const fileInput = page.locator('input[type="file"][data-testid="file-upload"]').last();
  await expect(fileInput).toBeAttached({ timeout: 10000 });

  // Upload dispara POST/PUT para GCS — endpoint crítico de mapeamento
  await fileInput.setInputFiles(filePath);

  // Aguardar upload processar antes de selecionar pasta
  await page.waitForTimeout(1500);

  await page.getByRole('button', { name: folderName, exact: true }).click();

  const concluirBtn = page.getByRole('button', { name: 'Concluir', exact: true });
  await expect(concluirBtn).toBeEnabled({ timeout: 15000 });
  await concluirBtn.click();

  await expect(page.getByText('Adicione um novo documento clicando no botão abaixo'))
    .not.toBeVisible({ timeout: 20000 });

  await expect(fieldContainer.locator('[data-testid="imageThumbnail"]'))
    .toBeVisible({ timeout: 15000 });

  await page.waitForTimeout(500);
}

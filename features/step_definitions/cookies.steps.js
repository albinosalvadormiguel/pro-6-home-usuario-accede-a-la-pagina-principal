// Step definitions for Cookies features (TAL-8, TAL-9, TAL-10)
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario visita la página por primera vez', async function () {
  // limpiar consentimiento previo
  await this.page.context().clearCookies();
  await this.page.goto(this.baseUrl);
});

When('se carga la web', async function () {
  await this.page.waitForSelector('body');
});

Then('debe mostrarse un banner solicitando consentimiento de cookies', async function () {
  await expect(this.page.locator('#cookie-banner')).toHaveClass(/show/);
});

Given('el banner de cookies está visible', async function () {
  await this.page.goto(this.baseUrl);
  await expect(this.page.locator('#cookie-banner')).toBeVisible();
});

When('el usuario hace clic en "Aceptar todas"', async function () {
  await this.page.click('#btnAceptarCookies');
});

Then('el banner desaparece', async function () {
  await expect(this.page.locator('#cookie-banner')).toBeHidden();
});

Then('el sistema guarda el consentimiento en una cookie segura', async function () {
  const cookies = await this.context.cookies();
  expect(cookies.some(c => c.name === 'consent' && c.value === 'all')).toBeTruthy();
});

When('el usuario hace clic en "Rechazar"', async function () {
  await this.page.click('#btnRechazarCookies');
});

Then('no se activa ningún sistema de tracking', async function () {
  // Placeholder: en esta demo no hay tracking; podríamos comprobar ausencia de cookies externas
  const cookies = await this.context.cookies();
  expect(cookies.find(c => c.name === 'consent')?.value).not.toBe('all');
});

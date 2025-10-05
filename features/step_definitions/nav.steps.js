// Step definitions for Nav features (TAL-11, TAL-12)
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el menú principal está visible', async function () {
  await this.page.goto(this.baseUrl);
  await expect(this.page.locator('nav[aria-label="Menú principal"]')).toBeVisible();
});

When('el usuario hace clic en el enlace {string}', async function (texto) {
  await this.page.getByRole('link', { name: texto }).click();
});

// Alias específico para el texto del feature original
When('el usuario hace clic en "Servicios"', async function () {
  await this.page.getByRole('link', { name: 'Servicios' }).click();
});

Then('el sistema debe redirigir correctamente a la página de servicios', async function () {
  // Para anclas locales, comprobamos visibilidad de la sección Servicios
  await expect(this.page.locator('#servicios')).toBeVisible();
});

Given('el usuario está en cualquier página', async function () {
  await this.page.goto(this.baseUrl);
});

When('hace clic en "Política de privacidad"', async function () {
  await this.page.getByRole('link', { name: 'Política de privacidad' }).click();
});

Then('debe abrirse la página de política de privacidad', async function () {
  await expect(this.page).toHaveURL(new RegExp('/privacy.html'));
  await expect(this.page.getByRole('heading', { level: 1, name: 'Política de privacidad' })).toBeVisible();
});

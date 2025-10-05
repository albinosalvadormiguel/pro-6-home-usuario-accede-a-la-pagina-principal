// Step definitions for Home features (TAL-1, TAL-2)
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario accede al dominio principal', async function () {
  await this.page.goto(this.baseUrl);
});

When('la página carga correctamente', async function () {
  await this.page.waitForSelector('header');
});

Then('debe mostrarse el encabezado con el logo y el menú principal', async function () {
  await expect(this.page.locator('#logo')).toBeVisible();
  await expect(this.page.locator('nav[aria-label="Menú principal"]')).toBeVisible();
});

Then('debe haber enlaces visibles a {string}, {string}, {string}, {string} y {string}', async function (servicios, casosDeUso, proyectos, nosotros, contacto) {
  for (const texto of [servicios, casosDeUso, proyectos, nosotros, contacto]) {
    await expect(this.page.getByRole('link', { name: texto })).toBeVisible();
  }
});

Given('el usuario está en la sección "Prueba una automatización"', async function () {
  await this.page.goto(this.baseUrl);
  await this.page.locator('#prueba-automatizacion').scrollIntoViewIfNeeded();
  await expect(this.page.getByRole('heading', { level: 2, name: 'Prueba una automatización' })).toBeVisible();
});

When('introduce su dirección de correo válida y hace clic en "Enviar prueba"', async function () {
  await this.page.fill('#emailPrueba', 'user@example.com');
  await this.page.click('#btnEnviarPrueba');
});

Then('el sistema debe enviar un correo automático de prueba', async function () {
  // Para esta demo, verificamos que se muestre el resultado como efecto del click
  await expect(this.page.locator('#resultadoPrueba')).toBeVisible();
});

Then('debe mostrarse un mensaje confirmando que la automatización fue exitosa', async function () {
  await expect(this.page.locator('#resultadoPrueba')).toContainText('Automatización enviada correctamente');
});

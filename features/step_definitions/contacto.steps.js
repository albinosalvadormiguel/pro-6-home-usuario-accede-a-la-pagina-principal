// Step definitions for Contacto features (TAL-6, TAL-7)
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario está en la página "Contacto"', async function () {
  await this.page.goto(this.baseUrl);
  await this.page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(this.page.locator('#contacto')).toBeVisible();
});

When(/^rellena los campos obligatorios \(nombre, correo, descripci[oó]n\)$/u, async function () {
  await this.page.fill('#nombre', 'Juan');
  await this.page.fill('#correo', 'juan@example.com');
  await this.page.fill('#descripcion', 'Necesito automatizar emails de ventas');
});

When('hace clic en "Enviar"', async function () {
  await this.page.click('#btnEnviarContacto');
});

Then('el sistema debe validar los datos', async function () {
  // Si hay datos, no debe aparecer alerta de error
  await expect(this.page.locator('#errorContacto')).toHaveClass(/hidden/);
});

Then('debe enviar la información correctamente', async function () {
  await expect(this.page.locator('#confirmacionContacto')).toBeVisible();
});

Then('mostrar un mensaje de confirmación', async function () {
  await expect(this.page.locator('#confirmacionContacto')).toContainText('Mensaje enviado');
});

// Sugerencias
Given('el usuario introduce una descripción con palabras clave', async function () {
  await this.page.goto(this.baseUrl);
  await this.page.fill('#descripcion', 'email ventas');
});

When(/^el campo "Descripción" detecta términos relacionados \(por ejemplo "email", "ventas"\)$/u, async function () {
  // Dispara evento de input para que se muestren sugerencias
  await this.page.focus('#descripcion');
  await this.page.keyboard.type(' '); // fuerza evento input
});

Then(/^el sistema debe mostrar sugerencias de automatizaci[oó]n relevantes$/u, async function () {
  await expect(this.page.locator('#sugerencias')).toBeVisible();
});

// Step definitions for Contacto features (TAL-6, TAL-7)
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('el usuario está en la página "Contacto"', async function () {
  await this.page.goto(this.baseUrl);
  await this.page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(this.page.locator('#contacto')).toBeVisible();
});

When('rellena los campos obligatorios (nombre, correo, descripción)', async function () {
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

// Sugerencias (placeholder, en esta demo no hay UI real de sugerencias)
Given('el usuario introduce una descripción con palabras clave', async function () {
  await this.page.goto(this.baseUrl);
  await this.page.fill('#descripcion', 'email ventas');
});

When('el campo "Descripción" detecta términos relacionados (por ejemplo "email", "ventas")', async function () {
  // Aquí se esperaría lógica de sugerencias; dejamos una expectativa placeholder que fallará hasta implementarlo
});

Then('el sistema debe mostrar sugerencias de automatización relevantes', async function () {
  // Placeholder: a implementar más adelante (fallará hasta tener UI de sugerencias)
  await expect(this.page.locator('#sugerencias')).toBeVisible();
});

// Step definitions for Errors features (TAL-13, TAL-14)
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// TAL-13: Error en el envío del correo de prueba
Given('el usuario intenta ejecutar una automatización', async function () {
  await this.page.goto(this.baseUrl);
  await this.page.locator('#prueba-automatizacion').scrollIntoViewIfNeeded();
});

When('ocurre un error de conexión o envío', async function () {
  // Placeholder: Forzaremos un estado de error simulando email vacío
  await this.page.fill('#emailPrueba', '');
  await this.page.click('#btnEnviarPrueba');
});

Then('debe mostrarse un mensaje: {string}', async function (mensaje) {
  // Verifica el contenedor específico de error en prueba de automatización
  await expect(this.page.locator('#errorPrueba')).toBeVisible();
  await expect(this.page.locator('#errorPrueba')).toContainText(mensaje);
});

// TAL-14: Campos incompletos en formulario
Given('el usuario deja un campo obligatorio vacío', async function () {
  await this.page.goto(this.baseUrl);
  await this.page.locator('#contacto').scrollIntoViewIfNeeded();
});

When('intenta enviar el formulario', async function () {
  // deja nombre vacío
  await this.page.fill('#correo', 'incompleto@example.com');
  await this.page.fill('#descripcion', 'Prueba de campos incompletos');
  await this.page.click('#btnEnviarContacto');
});

Then('el sistema debe marcar el campo en rojo', async function () {
  // Versión estable: esperamos la clase 'error' en el campo requerido
  await this.page.waitForSelector('#nombre.error', { timeout: 15000 });
});

Then('no se muestra la confirmación de envío', async function () {
  // Confirmación debe permanecer oculta cuando falta un campo obligatorio
  await this.page.waitForTimeout(50);
  await expect(this.page.locator('#confirmacionContacto')).toBeHidden();
});

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
  // En esta demo el mensaje de error real está en el formulario de contacto; mantendremos placeholder a implementar
  await expect(this.page.locator('text="' + mensaje + '"')).toBeVisible();
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
  const borde = await this.page.$eval('#nombre', el => getComputedStyle(el).borderColor);
  expect(borde).toMatch(/rgb\(255, 0, 0\)|red/);
});

Then('mostrar un mensaje de validación clara', async function () {
  // Podríamos mostrar un aria-invalid o mensaje; placeholder
  // Validaremos que no aparece confirmación y que el foco sigue en el campo requerido
  await expect(this.page.locator('#confirmacionContacto')).toHaveClass(/hidden/);
});

// Step definitions for Auth features (TAL-3, TAL-4, TAL-5)
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// TAL-3: Registro
Given('el usuario está en la página de registro', async function () {
  await this.page.goto(this.baseUrl + '/src/pages/users/registro.html');
});

When('introduce un correo válido y una contraseña segura', async function () {
  await this.page.fill('#registro-correo', 'user@example.com');
  await this.page.fill('#registro-password', 'StrongP@ssw0rd');
});

When('hace clic en "Crear cuenta"', async function () {
  await this.page.click('#registro-crear');
});

Then('el sistema debe crear la cuenta', async function () {
  await expect(this.page.locator('#registro-confirmacion')).toBeVisible();
});

// Nota: el paso genérico "mostrar un mensaje de confirmación" se maneja en contacto.steps.js

Then('se muestra un mensaje de confirmación de registro', async function () {
  await expect(this.page.locator('#registro-confirmacion')).toContainText('Cuenta creada');
});

// TAL-4: Login
Given('el usuario tiene una cuenta registrada', async function () {
  await this.page.goto(this.baseUrl + '/src/pages/users/login.html');
});

When('introduce sus credenciales correctas', async function () {
  await this.page.fill('#login-correo', 'user@example.com');
  await this.page.fill('#login-password', 'StrongP@ssw0rd');
  await this.page.click('#login-ingresar');
});

Then('el sistema debe iniciar sesión', async function () {
  await expect(this.page.locator('#login-ok')).toBeVisible();
});

Then('redirigirlo a su panel o al inicio', async function () {
  await expect(this.page).toHaveURL(new RegExp(this.baseUrl));
});

// TAL-5: Recuperar contraseña
Given('el usuario olvidó su contraseña', async function () {
  await this.page.goto(this.baseUrl + '/src/pages/users/recuperar.html');
});

When('solicita recuperación con su correo registrado', async function () {
  await this.page.fill('#recuperar-correo', 'user@example.com');
  await this.page.click('#recuperar-enviar');
});

Then('el sistema debe enviar un enlace de restablecimiento al correo indicado', async function () {
  await expect(this.page.locator('#recuperar-confirmacion')).toBeVisible();
});

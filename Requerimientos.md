Feature: Página principal con prueba de automatización
Scenario: Usuario accede a la página principal
Given el usuario accede al dominio principal
When la página carga correctamente
Then debe mostrarse el encabezado con el logo y el menú principal
And debe haber enlaces visibles a "Servicios", "Casos de uso", "Proyectos", "Nosotros" y "Contacto"

Scenario: Usuario ejecuta una prueba de automatización
Given el usuario está en la sección "Prueba una automatización"
When introduce su dirección de correo válida y hace clic en "Enviar prueba"
Then el sistema debe enviar un correo automático de prueba
And debe mostrarse un mensaje confirmando que la automatización fue exitosa

Feature: Registro y autenticación de usuarios
Scenario: Usuario se registra con correo válido
Given el usuario está en la página de registro
When introduce un correo válido y una contraseña segura
And hace clic en "Crear cuenta"
Then el sistema debe crear la cuenta
And mostrar un mensaje de confirmación

Scenario: Usuario inicia sesión
Given el usuario tiene una cuenta registrada
When introduce sus credenciales correctas
Then el sistema debe iniciar sesión
And redirigirlo a su panel o al inicio

Scenario: Recuperar contraseña
Given el usuario olvidó su contraseña
When solicita recuperación con su correo registrado
Then el sistema debe enviar un enlace de restablecimiento al correo indicado

Feature: Formulario de contacto con sugerencias
Scenario: Usuario envía solicitud de contacto
Given el usuario está en la página "Contacto"
When rellena los campos obligatorios (nombre, correo, descripción)
And hace clic en "Enviar"
Then el sistema debe validar los datos
And debe enviar la información correctamente
And mostrar un mensaje de confirmación

Scenario: Sistema sugiere automatizaciones
Given el usuario introduce una descripción con palabras clave
When el campo "Descripción" detecta términos relacionados (por ejemplo "email", "ventas")
Then el sistema debe mostrar sugerencias de automatización relevantes

Feature: Gestión de cookies y políticas legales
Scenario: Usuario accede por primera vez al sitio
Given el usuario visita la página por primera vez
When se carga la web
Then debe mostrarse un banner solicitando consentimiento de cookies

Scenario: Usuario acepta cookies
Given el banner de cookies está visible
When el usuario hace clic en "Aceptar todas"
Then el banner desaparece
And el sistema guarda el consentimiento en una cookie segura

Scenario: Usuario rechaza cookies
Given el banner de cookies está visible
When el usuario hace clic en "Rechazar"
Then el banner desaparece
And no se activa ningún sistema de tracking

Feature: Navegación global del sitio
Scenario: Usuario navega a una sección desde el menú
Given el menú principal está visible
When el usuario hace clic en "Servicios"
Then el sistema debe redirigir correctamente a la página de servicios

Scenario: Enlaces de pie de página
Given el usuario está en cualquier página
When hace clic en "Política de privacidad"
Then debe abrirse la página de política de privacidad

Feature: Manejo básico de errores
Scenario: Error en el envío del correo de prueba
Given el usuario intenta ejecutar una automatización
When ocurre un error de conexión o envío
Then debe mostrarse un mensaje: "No se pudo completar la prueba. Inténtalo más tarde."

Scenario: Campos incompletos en formulario
Given el usuario deja un campo obligatorio vacío
When intenta enviar el formulario
Then el sistema debe marcar el campo en rojo
And mostrar un mensaje de validación clara
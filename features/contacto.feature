Feature: Formulario de contacto con sugerencias

  # TAL-6: Usuario envía solicitud de contacto (PRO-11)
  Scenario: Usuario envía solicitud de contacto
    Given el usuario está en la página "Contacto"
    When rellena los campos obligatorios (nombre, correo, descripción)
    And hace clic en "Enviar"
    Then el sistema debe validar los datos
    And debe enviar la información correctamente
    And mostrar un mensaje de confirmación

  # TAL-7: Sistema sugiere automatizaciones (PRO-12)
  Scenario: Sistema sugiere automatizaciones
    Given el usuario introduce una descripción con palabras clave
    When el campo "Descripción" detecta términos relacionados (por ejemplo "email", "ventas")
    Then el sistema debe mostrar sugerencias de automatización relevantes

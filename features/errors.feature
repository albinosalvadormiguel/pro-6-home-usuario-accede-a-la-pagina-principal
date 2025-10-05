Feature: Manejo básico de errores

  # TAL-13: Falla en envío de correo de prueba (PRO-18)
  Scenario: Error en el envío del correo de prueba
    Given el usuario intenta ejecutar una automatización
    When ocurre un error de conexión o envío
    Then debe mostrarse un mensaje: "No se pudo completar la prueba. Inténtalo más tarde."

  # TAL-14: Campos incompletos en formulario (PRO-19)
  Scenario: Campos incompletos en formulario
    Given el usuario deja un campo obligatorio vacío
    When intenta enviar el formulario
    Then el sistema debe marcar el campo en rojo
    And mostrar un mensaje de validación clara

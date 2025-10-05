Feature: Página principal con prueba de automatización

  # TAL-1: Usuario accede a la página principal (PRO-6)
  Scenario: Usuario accede a la página principal
    Given el usuario accede al dominio principal
    When la página carga correctamente
    Then debe mostrarse el encabezado con el logo y el menú principal
    And debe haber enlaces visibles a "Servicios", "Casos de uso", "Proyectos", "Nosotros" y "Contacto"

  # TAL-2: Usuario ejecuta una prueba de automatización (PRO-7)
  Scenario: Usuario ejecuta una prueba de automatización
    Given el usuario está en la sección "Prueba una automatización"
    When introduce su dirección de correo válida y hace clic en "Enviar prueba"
    Then el sistema debe enviar un correo automático de prueba
    And debe mostrarse un mensaje confirmando que la automatización fue exitosa

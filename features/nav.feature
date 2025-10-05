Feature: Navegación global del sitio

  # TAL-11: Navegación desde el menú principal (PRO-16)
  Scenario: Usuario navega a una sección desde el menú
    Given el menú principal está visible
    When el usuario hace clic en "Servicios"
    Then el sistema debe redirigir correctamente a la página de servicios

  # TAL-12: Enlaces de pie de página (PRO-17)
  Scenario: Enlaces de pie de página
    Given el usuario está en cualquier página
    When hace clic en "Política de privacidad"
    Then debe abrirse la página de política de privacidad

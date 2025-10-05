Feature: Gestión de cookies y políticas legales

  # TAL-8: Banner de consentimiento en primera visita (PRO-13)
  Scenario: Usuario accede por primera vez al sitio
    Given el usuario visita la página por primera vez
    When se carga la web
    Then debe mostrarse un banner solicitando consentimiento de cookies

  # TAL-9: Aceptación de cookies (PRO-14)
  Scenario: Usuario acepta cookies
    Given el banner de cookies está visible
    When el usuario hace clic en "Aceptar todas"
    Then el banner desaparece
    And el sistema guarda el consentimiento en una cookie segura

  # TAL-10: Rechazo de cookies (PRO-15)
  Scenario: Usuario rechaza cookies
    Given el banner de cookies está visible
    When el usuario hace clic en "Rechazar"
    Then el banner desaparece
    And no se activa ningún sistema de tracking

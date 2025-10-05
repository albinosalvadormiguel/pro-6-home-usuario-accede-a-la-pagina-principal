Feature: Registro y autenticación de usuarios

  # TAL-3: Usuario se registra con correo válido (PRO-8)
  Scenario: Usuario se registra con correo válido
    Given el usuario está en la página de registro
    When introduce un correo válido y una contraseña segura
    And hace clic en "Crear cuenta"
    Then el sistema debe crear la cuenta
    And se muestra un mensaje de confirmación de registro

  # TAL-4: Usuario inicia sesión (PRO-9)
  Scenario: Usuario inicia sesión
    Given el usuario tiene una cuenta registrada
    When introduce sus credenciales correctas
    Then el sistema debe iniciar sesión
    And redirigirlo a su panel o al inicio

  # TAL-5: Recuperar contraseña (PRO-10)
  Scenario: Recuperar contraseña
    Given el usuario olvidó su contraseña
    When solicita recuperación con su correo registrado
    Then el sistema debe enviar un enlace de restablecimiento al correo indicado

export const emailTemplates = {
  newUserGreetingEmail: (name) => `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Bienvenido a Z! Juegos</title>
    </head>
    <body>
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
    <td align="center" bgcolor="#f7f7f7">
    <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse: collapse;">
    <tr>
    <td align="center" bgcolor="#ffffff" style="padding: 40px 0 30px 0;">
      <img src="https://i.imgur.com/ll13OQl.png" alt="Logo" width="150">
    </td>
    </tr>
    <tr>
    <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
        <tr>
          <td style="color: #333333; font-family: Arial, sans-serif; font-size: 24px;">
            Bienvenido, ${name}!
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 0 30px 0; color: #333333; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
            Estimado ${name},
            <br><br>
            Bienvenido a nuestra nueva plataforma! Estamos emocionados de que formes parte de nuestra comunidad.
            <br><br>
            Preparate para explorar funciones interesantes, conectarte con otros usuarios y disfrutar de una experiencia fantástica.
            <br><br>
            Si tenes alguna duda o pregunta, no dudes en comunicarte con nuestro equipo de soporte.
            <br><br>
            Una vez más, bienvenido a bordo!
            <br><br>
            Atentamente,
            <br>
            Z! Juegos
          </td>
        </tr>
      </table>
    </td>
    </tr>
    <tr>
    <td bgcolor="#f7f7f7" align="center" style="padding: 20px 0 20px 0; color: #888888; font-family: Arial, sans-serif; font-size: 12px;">
    Este es un correo electrónico automatizado. Por favor, no lo responda.
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
    </html>
  `,
  passwordRestoreEmail: (email, name, token, domain) => `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Z! Juegos - Reestablecimiento de contraseña</title>
  </head>
  <body>
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
  <tr>
  <td align="center" bgcolor="#f7f7f7">
  <table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse: collapse;">
  <tr>
  <td align="center" bgcolor="#ffffff" style="padding: 40px 0 30px 0;">
    <img src="https://i.imgur.com/ll13OQl.png" alt="Logo" width="150">
  </td>
  </tr>
  <tr>
  <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
      <tr>
        <td style="color: #333333; font-family: Arial, sans-serif; font-size: 24px;">
          Reestablecimiento de contraseña para ${email}
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 0 30px 0; color: #333333; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
          Estimado ${name},
          <br><br>
          Recibimos una solicitud para restablecer tu contraseña. Para continuar con el proceso de restauración, hacé clic en el siguiente enlace:
          <br><br>
          <a href="http://localhost:5173/restaurar?token=${token}" target="_blank">Restaurar contraseña</a>
          <br><br>
          Este enlace será válido durante 1 hora. Por favor, recordá establecer una contraseña diferente a la que tenías antes.
          <br><br>
          Si no iniciaste esta solicitud, podes ignorar este correo. Tu cuenta permanece segura.
          <br><br>
          Gracias por usar nuestros servicios!
          <br><br>
          Atentamente,
          <br>
          Z! Juegos
        </td>
      </tr>
    </table>
  </td>
  </tr>
  <tr>
  <td bgcolor="#f7f7f7" align="center" style="padding: 20px 0 20px 0; color: #888888; font-family: Arial, sans-serif; font-size: 12px;">
    Este es un correo electrónico automatizado. Por favor, no lo responda.
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </body>
  </html>
  `,
  reservationUpdateEmail: () => `Aviso al usuario cuando se cambia una reserva`,
  reservationDeleteEmail: () =>
    `Aviso al usuario cuando se elimina una reserva`,
};

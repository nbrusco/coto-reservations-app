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
            Una vez más, ¡bienvenido a bordo!
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
  passwordRestoreEmail: (email, name, token) => `
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
  reservationEmail: (
    { name, email, type, code, guests, commentaries },
    date
  ) => `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Confirmación de Reserva en Z! Juegos</title>
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
          Confirmación de Reserva
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 0 30px 0; color: #333333; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
          Estimado ${name},
          <br><br>
          ¡Tu reserva en Z! Juegos está confirmada! A continuación verás los detalles:
          <br><br>
          - Nombre: ${name}
          <br>
          - Correo Electrónico: ${email}
          <br>
          - Fecha de Reserva: ${date}
          <br>
          - Tipo de Evento: ${type}
          <br>
          - Cantidad de Invitados: ${guests}
          <br>
          - Código de Reserva: ${code}
          <br>
          - Comentarios: ${commentaries || 'Ninguno'}
          <br><br>
          ¡Esperamos que tengas una experiencia increíble en Z! Juegos!
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
  reservationUpdateEmail: (oldReservation, newReservation, oldFormattedDate, newFormattedDate) => `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Notificación de Modificación de Reserva en Z! Juegos</title>
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
        Modificación de Reserva
      </td>
      </tr>
      <tr>
      <td style="padding: 20px 0 30px 0; color: #333333; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
        Estimado ${oldReservation.name},
        <br><br>
        Te enviamos este correo para informarte que tu reserva en Z! Juegos fue modificada. A continuación, te proporcionamos los detalles:
          <br><br>
          - Fecha de Reserva Original: ${oldFormattedDate}
          <br>
          <b>- Nueva Fecha de Reserva: ${newFormattedDate}</b>
          <br><br>
          - Tipo de Evento Original: ${oldReservation.type}
          <br>
          <b>- Nuevo Tipo de Evento: ${newReservation.type}</b>
          <br><br>
          - Cantidad de Invitados Original: ${oldReservation.guests}
          <br>
          <b>- Nueva Cantidad de Invitados: ${newReservation.guests}</b>
          <br><br>
          - Comentarios Originales: ${oldReservation.commentaries || 'Ninguno'}
          <br>
          <b>- Nuevos Comentarios: ${newReservation.commentaries || 'Ninguno'}</b>
          <br><br>
          Si tenes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros.
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
  reservationDeleteEmail: (
    { name, email, type, code, guests, commentaries },
    date, reason
  ) => `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Notificación de Eliminación de Reserva en Z! Juegos</title>
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
      Eliminación de Reserva
    </td>
    </tr>
    <tr>
    <td style="padding: 20px 0 30px 0; color: #333333; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
      Estimado ${name},
      <br><br>
      Te enviamos este correo para informarte que tu reserva en Z! Juegos fue cancelada. A continuación, te proporcionamos los detalles:
        <br><br>
        <b>- Motivo: ${reason}</b>
        <br><br>
        - Nombre: ${name}
        <br>
        - Correo Electrónico: ${email}
        <br>
        - Fecha de Reserva: ${date}
        <br>
        - Tipo de Evento: ${type}
        <br>
        - Cantidad de Invitados: ${guests}
        <br>
        - Código de Reserva: ${code}
        <br>
        - Comentarios: ${commentaries || 'Ninguno'}
        <br><br>
        Si tenes alguna pregunta o necesitás asistencia adicional, no dudes en ponerte en contacto con nosotros.
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
  `
}

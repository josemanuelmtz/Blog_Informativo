import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Configurar el objeto transporter para enviar correos electrónicos
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'juanmatacuicos@gmail.com',
    pass: 'rqearejqrjkpucbj'
  }
});

export const login = async (req, res) => {
  const { usuario, contrasena } = req.query;
 
  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporcione usuario y contraseña' });
  }

  try {
    const results = await pool.query('SELECT * FROM usuario WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);
    const correo = await pool.query('SELECT correo FROM usuario WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);
    if (results.length > 0) {
      const userData = results[0]; 
      const email = correo[0];
      const emailText = email[0].correo;
      console.log(emailText)
      console.log(email)
      const otp = Math.floor(1000 + Math.random() * 9000);

      // Enviar correo electrónico con el código OTP
      const mailOptions = {
        from: 'juanmatacuicos@gmail.com',
        to: emailText,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${otp}`
      };      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo electrónico:', error);
          return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        } else {
          console.log('Email enviado: ' + info.response);
          return res.status(200).json({ message: 'Correo electrónico con el código de verificación enviado correctamente' });
        }
      });
      return res.status(200).json({ message: 'Inicio de sesión exitoso', userData, otp });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
  
// Función para enviar correo electrónico de restablecimiento de contraseña
function resetPasswordEmail(usuario, resetToken) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 0 20px;
      }
      .header {
        background-color: #007bff;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
        background-color: #ffffff;
      }
      .footer {
        padding: 20px;
        text-align: center;
        background-color: #007bff;
        color: #fff;
  
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      .img-container {
          text-align: center;
        }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Restablecer Contraseña</h2>
      </div>
      <div class="content">
        <p>Hola ${usuario.usuario},</p>
        <p>Has solicitado restablecer tu contraseña. Para restablecerla, haz clic en el siguiente botón:</p>
        <button type="button" class="btn btn-outline-light"><p><a href="http://localhost:4200/restablecer?token=${resetToken}">Restablecer Contraseña</a></p></button>
        <p>Este enlace expirará en una hora.</p>
        <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo electrónico.</p>
        <div class="img-container">
          <img src="https://www.edenred.es/wp-content/uploads/2022/03/ImagenBlog_1.jpg" width="250">
        </div>
      </div>
      
      <div class="footer">
        <h3>Gracias, tu equipo de ACTUNITY</h3>
      </div>
    </div>
  </body>
  </html>
  
  `;
}

// Controlador para solicitar restablecimiento de contraseña
export const recuperarContrasena = async (req, res) => {
  try {
    const { email } = req.body;

    // Consulta para buscar el usuario por su correo electrónico
    const query = 'SELECT * FROM usuario WHERE correo = ?';
    const [rows] = await pool.query(query, [email]);

    // Verificar si el usuario existe
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = rows[0];
    
    // Generar token de restablecimiento de contraseña
    const resetToken = jwt.sign({ usuarioId: usuario.id_u }, 'secreto', { expiresIn: '1h' });
    
    // Actualizar el token de reseteo de contraseña en la base de datos
    const updateQuery = 'UPDATE usuario SET resetToken = ?, resetExpires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id_u = ?';
    await pool.query(updateQuery, [resetToken, usuario.id_u]);

    // Envía el correo electrónico con el enlace de restablecimiento de contraseña
    const mailOptions = {
      from: 'juanmatacuicos@gmail.com',
      to: usuario.correo, // Se utiliza 'correo' en lugar de 'email'
      subject: 'Restablecer contraseña',
      html: resetPasswordEmail(usuario, resetToken)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ mensaje: 'Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Controlador para cambiar la contraseña
export const cambiarContrasena = async (req, res) => {
  try {
    const { newPassword, token } = req.body;

    // Verificar si se proporcionó una nueva contraseña y un token válido
    if (!newPassword || !token) {
      return res.status(400).json({ mensaje: 'Se requiere una nueva contraseña y un token válido' });
    }

    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, 'secreto');

    // Verificar si el token está expirado
    if (decodedToken.expires < Date.now()) {
      return res.status(400).json({ mensaje: 'El token de restablecimiento de contraseña ha expirado' });
    }

    // Consultar el usuario por su ID
    const query = 'SELECT * FROM usuario WHERE id_u = ?'; // Cambiado id a id_u según tu esquema de tabla
    const [rows] = await pool.query(query, [decodedToken.usuarioId]);

    // Verificar si el usuario existe
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = rows[0];

    // Actualizar la contraseña y borrar el token de reseteo de la contraseña
    const updateQuery = 'UPDATE usuario SET contrasena = ?, resetToken = NULL, resetExpires = NULL WHERE id_u = ?'; // Cambiado id a id_u
    await pool.query(updateQuery, [newPassword, usuario.id_u]); // Cambiado id a id_u

    res.status(200).json({ mensaje: 'Contraseña restablecida exitosamente' });

  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ mensaje: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ mensaje: 'El token de restablecimiento de contraseña ha expirado' });
    }
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


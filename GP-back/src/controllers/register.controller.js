import { pool } from '../db.js';
import nodemailer from 'nodemailer';
// Configurar el objeto transporter para enviar correos electrónicos
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'juanmatacuicos@gmail.com',
    pass: 'rqearejqrjkpucbj'
  }
});

export const register = async (req, res) => {
  console.log('register');
  console.log(req.body);
  const { usuario, contrasena, correo } = req.body;

  if (!usuario || !contrasena || !correo) {
    return res.status(400).json({ message: 'Por favor, proporcione un nombre de usuario y contraseña' });
  }
  try {

    const newUser = { usuario, contrasena, correo };
    await pool.query('INSERT INTO usuario SET ?', newUser);

    return res.status(201).json({ message: 'Usuario registrado con éxito', newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};


export const checkUserExists = async (req, res) => {
  console.log('get', req.query);
  const { usuario, correo } = req.query;

  if (!usuario || !correo) {
    return res.status(400).json({ message: 'Por favor, proporcione un nombre de usuario y correo electrónico.' });
  }

  try {
    const result = await pool.query('SELECT * FROM usuario WHERE usuario = ? AND correo = ?', [usuario, correo]);
    const userData = result[0]; 
    if (userData.length > 0) {
      console.log('Usuario encontrado');
      const user = result[0]; 
      return res.status(200).json({ user });
    } else {
      console.log('Usuario no encontrado, enviando correo electrónico...');
      const email = correo.toString();
      const otp = Math.floor(1000 + Math.random() * 9000);
      // Enviar correo electrónico con el código OTP
      const mailOptions = {
        from: 'juanmatacuicos@gmail.com',
        to: email,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${otp}`
      };      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo electrónico:', error);
          return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        } else {
          console.log('Correo electrónico enviado correctamente');
          return res.status(200).json({ message: 'Correo electrónico con el código de verificación enviado correctamente' });
        }
      });
      return res.status(200).json({ message: 'Check exitoso', otp });
    }
  } catch (error) {
    console.error('Error al verificar usuario existente:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};







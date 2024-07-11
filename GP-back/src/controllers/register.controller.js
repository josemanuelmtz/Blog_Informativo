import { pool } from '../db.js';

export const register = async (req, res) => {
  const { usuario, contrasena, correo } = req.body;

  if (!usuario || !contrasena || !correo) {
    return res.status(400).json({ message: 'Por favor, proporcione un nombre de usuario, contraseña y correo' });
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





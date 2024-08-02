import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { usuario, contrasena, correo } = req.body;

  if (!usuario || !contrasena || !correo) {
    return res.status(400).json({ message: 'Por favor, proporcione un nombre de usuario, contraseña y correo' });
  }

  try {
    // Verificar si el correo ya existe en la base de datos
    const [existingUser] = await pool.query('SELECT correo FROM usuario WHERE correo = ?', [correo]);

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Generar un hash de la contraseña antes de almacenarla
    const saltRounds = 10; // Puedes ajustar el número de rondas de salt según sea necesario
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Definir un rol por defecto (por ejemplo, 'user')
    const rol = 0;

    // Crear el objeto para el nuevo usuario con el rol por defecto
    const newUser = { usuario, contrasena: hashedPassword, correo, rol };
    
    // Insertar el nuevo usuario en la base de datos
    await pool.query('INSERT INTO usuario SET ?', newUser);

    return res.status(201).json({ message: 'Usuario registrado con éxito', newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

/*
import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { usuario, contrasena, correo } = req.body;

  if (!usuario || !contrasena || !correo) {
    return res.status(400).json({ message: 'Por favor, proporcione un nombre de usuario, contraseña y correo' });
  }

  try {
    // Generar un hash de la contraseña antes de almacenarla
    const saltRounds = 10; // Puedes ajustar el número de rondas de salt según sea necesario
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    const newUser = { usuario, contrasena: hashedPassword, correo };
    await pool.query('INSERT INTO usuario SET ?', newUser);

    return res.status(201).json({ message: 'Usuario registrado con éxito', newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

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
*/




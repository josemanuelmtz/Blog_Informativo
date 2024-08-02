/*
import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { usuario, contrasena } = req.body; // Usar el cuerpo de la solicitud

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporcione usuario y contraseña' });
  }

  try {
    const results = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
    const userData = results[0];

    if (userData.length > 0) {
      const validPassword = await bcrypt.compare(contrasena, userData[0].contrasena); // Comprobar contraseña
      if (validPassword) {
        return res.status(200).json({ message: 'Inicio de sesión exitoso', userData });
      } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

import { pool } from '../db.js';

export const login = async (req, res) => {
  const { usuario, contrasena } = req.body; // Usar el cuerpo de la solicitud

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporcione usuario y contraseña' });
  }

  try {
    const results = await pool.query('SELECT * FROM usuario WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);
    const userData = results[0];

    if (userData.length > 0) {
      return res.status(200).json({ message: 'Inicio de sesión exitoso', userData });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};


import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporcione usuario y contraseña' });
  }

  try {
    const [results] = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
    if (results.length > 0) {
      const userData = results[0];

      const validPassword = await bcrypt.compare(contrasena, userData.contrasena);
      if (validPassword) {
        // Generar un token JWT
        const secretKey = 'hola';
        const token = jwt.sign({ id: userData.id, usuario: userData.usuario, rol: userData.rol }, secretKey, { expiresIn: '1h' });

        const { contrasena, ...userWithoutPassword } = userData;

        return res.status(200).json({ message: 'Inicio de sesión exitoso', token, user: userWithoutPassword });
      } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
*/

import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define secret key in an environment variable or a configuration file
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

export const login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporcione usuario y contraseña' });
  }

  try {
    // Query to find the user by username
    const [results] = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);

    if (results.length > 0) {
      const userData = results[0];

      // Compare provided password with hashed password stored in database
      const validPassword = await bcrypt.compare(contrasena, userData.contrasena);

      if (validPassword) {
        // Generate JWT token
        const token = jwt.sign({
          id: userData.id_u,
          usuario: userData.usuario,
          rol: userData.rol
        }, secretKey, { expiresIn: '1h' });

        // Remove password from user data before sending response
        const { contrasena, ...userWithoutPassword } = userData;

        return res.status(200).json({
          message: 'Inicio de sesión exitoso',
          token,
          user: userWithoutPassword
        });
      } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

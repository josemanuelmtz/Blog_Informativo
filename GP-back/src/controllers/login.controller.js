import { pool } from '../db.js';

export const login = async (req, res) => {
  const { usuario, contrasena } = req.query;

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
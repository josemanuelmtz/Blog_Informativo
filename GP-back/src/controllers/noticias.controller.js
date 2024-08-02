import { pool } from '../db.js';

// Crear noticia
/*
export const createNoticia = async (req, res) => {
  const { titulo, contenido, autor_id } = req.body;

  if (!titulo || !contenido || !autor_id) {
    return res.status(400).json({ message: 'Por favor, proporcione todos los datos requeridos' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO noticias (titulo, contenido, autor_id) VALUES (?, ?, ?)',
      [titulo, contenido, autor_id]
    );
    return res.status(201).json({ message: 'Noticia creada con éxito', id: result.insertId });
  } catch (error) {
    console.error('Error al crear la noticia:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};*/


export const createNoticia = async (req, res) => {
  const { titulo, contenido, autor_id } = req.body;

  if (!titulo || !contenido || !autor_id) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  try {
    const [result] = await pool.query('INSERT INTO noticias (titulo, contenido, autor_id) VALUES (?, ?, ?)', [titulo, contenido, autor_id]);
    const insertedId = result.insertId;

    res.status(201).json({ id: insertedId });
  } catch (error) {
    console.error('Error al insertar la noticia:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


// Leer todas las noticias
export const getNoticias = async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT n.*, u.usuario AS nombre_autor 
      FROM noticias n
      INNER JOIN usuario u ON n.autor_id = u.id_u
    `);
    return res.status(200).json(results);
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};


// Leer una noticia por id
export const getNoticiaById = async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool.query('SELECT * FROM noticias WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    return res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error al obtener la noticia:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar noticia por id
export const updateNoticiaById = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido} = req.body;

  if (!titulo || !contenido ) {
    return res.status(400).json({ message: 'Por favor, proporcione todos los datos requeridos' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE noticias SET titulo = ?, contenido = ? WHERE id = ?',
      [titulo, contenido, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    return res.status(200).json({ message: 'Noticia actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la noticia:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Eliminar noticia por id
export const deleteNoticiaById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM noticias WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
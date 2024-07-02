import {pool} from '../db.js'

export const getAll = async (req,res)=>{
  try{
    const results = await pool.query('SELECT p.id_p, p.nom_p, p.des_p, u.usuario FROM proyecto as p INNER JOIN usuario as u ON p.id_u=u.id_u');
    res.json(results[0]);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
}

export const getAllProyectos = async (req,res) => {
    const idu = req.params.id;
    try {
        const results = await pool.query('SELECT * FROM proyecto WHERE id_u = ?', [idu]);
        res.json(results[0]);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error al obtener proyectos' });
      }
}

export const getProyecto = async (req,res) => {
    const idP = req.params.id;
  try {
    const results = await pool.query('SELECT * FROM proyecto WHERE id_p = ?', [idP]);
    if (results.length === 0) {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
}

export const createProyecto = async(req,res) => {
     try {
      const nuevoVuelo = req.body
      const[result] = await pool.query('INSERT INTO proyecto SET ?', [nuevoVuelo]);
        const idInsertado = result.insertId;
        res.json(idInsertado);
        console.log('ID del nuevo registro insertado:', idInsertado);
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
}

export const updateProyecto = async (req, res) => {
    const idP = req.params.id;
    const { id_u, nom_p, des_p, fecha_i, fecha_f } = req.body;
    const proyectoActualizado = { id_u, nom_p, des_p, fecha_i, fecha_f };

    try {
        const result = await pool.query('UPDATE proyecto SET ? WHERE id_p = ?', [proyectoActualizado, idP]);
        if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Proyecto no encontrado' });
        } else {
        res.json({ id_p: idP, ...proyectoActualizado });
        }
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
}

export const deleteProyecto = async (req,res) => {
    const idP = req.params.id;

    try {
        const result = await pool.query('DELETE FROM proyecto WHERE id_p = ?', [idP]);
        if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Proyecto no encontrado' });
        } else {
        res.json({ message: 'Proyecto eliminado exitosamente' });
        }
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
}
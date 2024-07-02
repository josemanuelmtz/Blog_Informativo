import {pool} from '../db.js'

export const addIntegrnates = async (req,res) =>{
    const { id_p, id_u} = req.body;
    const nuevo = { id_p, id_u };

    try {
        const result = await pool.query('INSERT INTO integrantes SET ?', nuevo);
        res.json('Añadidos');
        
    } catch (error) {
        console.error('Error al insertar integrantes:', error);
        res.status(500).json({ error: 'Error al insertar integrantes' });
    }
}

export const getUsername = async (req,res) =>{
    try{
        const searchTerm = req.params.searchTerm;
        const results = await pool.query('SELECT id_u, usuario FROM usuario WHERE usuario LIKE ?',[`%${searchTerm}%`]);
        res.json(results[0]);
        console.log(results[0])
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ error: 'Error al buscar usuarios' });
      }
}

export const getIntegrantes = async (req, res) =>{
    try{
        
        const results = await pool.query('SELECT i.id_u, u.usuario FROM integrantes i INNER JOIN usuario u ON i.id_u = u.id_u WHERE i.id_p = ?',[req.params.id]);
        res.json(results[0]);
        console.log(results[0])
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ error: 'Error al buscar usuarios' });
      }
}

export const eliminarU = async (req, res) => {
    try {
        const { id_p, id_u } = req.query; // Obtener los parámetros de la URL
        const results = await pool.query('DELETE FROM integrantes WHERE id_p = ? AND id_u = ?', [id_p, id_u]);
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        res.status(500).json({ error: 'Error al eliminar registro' });
    }
}





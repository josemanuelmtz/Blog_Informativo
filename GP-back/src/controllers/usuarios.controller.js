import {pool} from '../db.js'

export const getAllUser = async (req,res)=>{
    try{
        
        const results = await pool.query('SELECT id_u, usuario, estado_u FROM usuario WHERE id_u <> 1');
        res.json(results[0]);
        console.log(results[0])
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ error: 'Error al buscar usuarios' });
      }
}

export const bloquearU = async (req,res) =>{
    try{
        const { estado_u, id_u } = req.body;
        const results = await pool.query('UPDATE usuario SET estado_u = ? WHERE id_u = ?',[estado_u, id_u]);
        res.json("Actualizado");
        console.log("Actualizado")
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ error: 'Error al buscar usuarios' });
      }
}
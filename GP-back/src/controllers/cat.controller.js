import {pool} from '../db.js'

export const getActEstado = async (req, res) =>{
    try{
        
        const results = await pool.query('SELECT * FROM estado_act ORDER BY id_e DESC ');
        res.json(results[0]);
        console.log(results[0])
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error' });
      }
}
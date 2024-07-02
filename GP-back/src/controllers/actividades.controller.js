import { pool } from '../db.js'

export const getAct = async (req,res) => {
    const idp = req.params.id;
    try {
        const results = await pool.query(
            'SELECT a.id_a, a.id_p, a.id_u, a.nom_a, a.des_a, a.estado, a.notas, a.fecha_fin, u.usuario FROM actividad as a INNER JOIN usuario as u ON a.id_u=u.id_u WHERE id_a = ?', [idp]);
        if (results.length === 0) {
        res.status(404).json({ error: 'No hay Actividades' });
        } else {
        res.json(results[0]);
        }
    } catch (error) {
        console.error('Error al obtener las Actividades:', error);
        res.status(500).json({ error: 'Error al obtener las actividades' });
    }
}

export const verActP = async (req,res) => {
    const idp = req.params.id;
    try {
        const results = await pool.query(
            'SELECT a.id_a, a.id_p, a.id_u, a.nom_a, a.des_a, a.estado, a.notas, a.fecha_fin, u.usuario, e.nom_e FROM actividad AS a INNER JOIN usuario AS u ON a.id_u = u.id_u INNER JOIN estado_act AS e ON a.estado = e.id_e WHERE id_p = ? ORDER BY a.fecha_fin', 
            [idp]);
        if (results.length === 0) {
        res.status(404).json({ error: 'No hay Actividades' });
        } else {
        res.json(results[0]);
        }
    } catch (error) {
        console.error('Error al obtener las Actividades:', error);
        res.status(500).json({ error: 'Error al obtener las actividades' });
    }
}

export const verMisAct = async (req,res) => {
    const id = req.params.id;
    try {
        const results = await pool.query(
            'SELECT a.id_a, a.id_p, a.id_u, a.nom_a, a.des_a, a.estado, a.notas, a.fecha_fin, u.usuario, e.nom_e FROM actividad AS a INNER JOIN usuario AS u ON a.id_u = u.id_u INNER JOIN estado_act AS e ON a.estado = e.id_e WHERE a.id_u = ? ORDER BY a.fecha_fin', 
            [id]);
        if (results.length === 0) {
        res.status(404).json({ error: 'No hay Actividades' });
        } else {
        res.json(results[0]);
        }
    } catch (error) {
        console.error('Error al obtener las Actividades:', error);
        res.status(500).json({ error: 'Error al obtener las actividades' });
    }
}

export const createAct = async (req,res) => {
    const { id_p, id_u, nom_a, des_a, estado, fecha_fin, notas } = req.body;
    const nuevaActividad = { id_p, id_u, nom_a, des_a, estado, fecha_fin, notas };

    try {
    const result = await pool.query('INSERT INTO actividad SET ?', nuevaActividad);
    res.json({ id_a: result.insertId, ...nuevaActividad });
    } catch (error) {
    console.error('Error al crear la actividad:', error);
    res.status(500).json({ error: 'Error al crear la actividad' });
    }
}

export const updateAct = async (req,res) =>{
    const idA = req.params.id;
    const { id_u, nom_a, des_a, estado, fecha_fin, notas } = req.body;
    const actividadActualizada = { id_u, nom_a, des_a, estado, fecha_fin, notas };

    try {
    const result = await pool.query('UPDATE actividad SET ? WHERE id_a = ?', [actividadActualizada, idA]);
    if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Actividad no encontrada' });
    } else {
        res.json({ id_a: idA, ...actividadActualizada });
    }
    } catch (error) {
    console.error('Error al actualizar la actividad:', error);
    res.status(500).json({ error: 'Error al actualizar la actividad' });
    }
}

export const deleteAct = async (req,res) => {
    const ida = req.params.id;

    try {
        const result = await pool.query('DELETE FROM actividad WHERE id_a = ?', [ida]);
        if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Actividad no encontrada' });
        } else {
        res.json({ message: 'Actividad eliminado exitosamente' });
        }
    } catch (error) {
        console.error('Error al eliminar la Actividad:', error);
        res.status(500).json({ error: 'Error al eliminar la Actividad' });
    }
}


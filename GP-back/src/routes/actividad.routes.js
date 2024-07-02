import {Router} from 'express'
import { createAct, deleteAct, getAct, updateAct, verActP, verMisAct, } from '../controllers/actividades.controller.js'


const router = Router()

router.get('/actividad/:id',getAct)
router.get('/actividad/proyecto/:id', verActP)
router.get('/actividad/all/:id', verMisAct)
router.post('/actividad', createAct)
router.put('/actividad/:id',updateAct)
router.delete('/actividad/:id', deleteAct)

export default router
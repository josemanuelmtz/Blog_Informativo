import {Router} from 'express'
import { addIntegrnates, eliminarU,  getIntegrantes, getUsername } from '../controllers/integrantes.controller.js'

const router = Router()

router.get('/integrantes/:searchTerm', getUsername);
router.get('/integrantes/e/:id', getIntegrantes);
router.post('/integrantes',addIntegrnates);
router.delete('/integrantes',eliminarU);



export default router
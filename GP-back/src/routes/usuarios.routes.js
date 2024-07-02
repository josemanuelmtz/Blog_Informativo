import {Router} from 'express'
import { bloquearU, getAllUser} from '../controllers/usuarios.controller.js'

const router = Router()


router.get('/controlu/all', getAllUser);
router.post('/controlu', bloquearU);



export default router
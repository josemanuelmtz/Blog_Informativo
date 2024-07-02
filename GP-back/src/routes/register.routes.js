import {Router} from 'express'
import { register, checkUserExists} from '../controllers/register.controller.js';

const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/register', register);
router.get('/checkuser', checkUserExists);
export default router;

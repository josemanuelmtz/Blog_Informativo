import express from 'express';
import { login, recuperarContrasena, cambiarContrasena } from '../controllers/login.controller.js';

const router = express.Router();


router.get('/login', login);
router.post('/recuperar-contrasena', recuperarContrasena);
router.post('/cambiar-contrasena', cambiarContrasena);

export default router;


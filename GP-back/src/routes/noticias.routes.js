import { Router } from 'express';
import {
  createNoticia,
  getNoticias,
  getNoticiaById,
  updateNoticiaById,
  deleteNoticiaById
} from '../controllers/noticias.controller.js';

const router = Router();

router.post('/noticias', createNoticia);
router.get('/noticias', getNoticias);
router.get('/noticias/:id', getNoticiaById);
router.put('/noticias/:id', updateNoticiaById);
router.delete('/noticias/:id', deleteNoticiaById);

export default router;

import {Router} from 'express'
import { getActEstado } from '../controllers/cat.controller.js'


const router = Router()

router.get('/estado/act', getActEstado)


export default router
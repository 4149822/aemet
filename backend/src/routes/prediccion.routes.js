import { Router } from 'express';
import { getPrediccion } from '../controllers/prediccion.controller.js';

const router = Router();

router.get('/prediccion/diaria/:codigo', getPrediccion('diaria'));
router.get('/prediccion/horaria/:codigo', getPrediccion('horaria'));

export default router;

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        mensaje: 'Backend API AEMET'
    });
});

export default router;

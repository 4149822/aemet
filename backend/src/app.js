import express from 'express';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';
import prediccionRoutes from './routes/prediccion.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', indexRoutes);
app.use('/', prediccionRoutes);

// Middleware para rutas no encontradas y errores
app.use((req, res) => {
    res.status(404).json({
        mensaje: 'No encontrado.'
    });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Error en el servidor, pruébalo más adelante.'
    });
});

export default app;

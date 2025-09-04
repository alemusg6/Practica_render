const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Endpoint de prueba para verificar que Node/Express funciona
app.get('/test', (req, res) => {
    res.json({ mensaje: "Servidor Node/Express funcionando" });
});

// Endpoint GET usuarios con chequeo de conexión
app.get('/api/usuarios', async (req, res) => {
    try {
        // Intentar conectarse a PostgreSQL
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuarios');
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error('Error en la conexión a PostgreSQL:', err.message);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

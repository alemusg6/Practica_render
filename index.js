const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Endpoint GET usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

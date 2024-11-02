const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/database.js');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword],
            (error, results) => {
                if (error) return res.status(500).json({ error: 'Error en registro' });
                res.status(201).json({ message: 'Usuario registrado' });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Error en servidor' });
    }
});

// Inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {
        if (error || results.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas' });
        
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) return res.status(401).json({ error: 'Credenciales incorrectas' });
        
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;

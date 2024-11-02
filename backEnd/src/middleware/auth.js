const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) return res.status(403).json({ error: 'No se proporcionó token' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });
        req.userId = decoded.id;
        req.userRol = decoded.rol;
        next();
    });
};

module.exports = verifyToken;

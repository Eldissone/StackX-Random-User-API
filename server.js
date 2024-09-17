const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());

// Endpoint de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Valide as credenciais do usuário (exemplo simples)
    if (username === 'user' && password === 'password') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Credenciais inválidas' });
});

// Middleware de autenticação
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Endpoint protegido
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Acesso autorizado', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

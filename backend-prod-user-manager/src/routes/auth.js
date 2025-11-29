// src/routes/auth.js

import express from 'express';
const router = express.Router();

// MUDOU: de require para import e adicionado .js
import { register, login } from '../controllers/authController.js';

// Rota para registrar um novo usuário
// POST http://localhost:5001/api/auth/register
router.post('/register', register);

// Rota para fazer login
// POST http://localhost:5001/api/auth/login
router.post('/login', login);

// MUDOU: de module.exports para export default
export default router;
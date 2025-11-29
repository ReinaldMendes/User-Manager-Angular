// src/controllers/authController.js

import User from '../models/User.js'; // MUDOU: de require para import (e adicionado .js)
import jwt from 'jsonwebtoken';       // MUDOU: de require para import

// Função para registrar um novo administrador
// MUDOU: de exports.register para export const register
export const register = async (req, res) => {
  try {
    // Voltamos a pegar apenas os dados essenciais
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }
    
    // O usuário será criado sempre com a role default ('USER')
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    // ... resto da função igual
  }
};

// Função para fazer login e gerar um token
// MUDOU: de exports.login para export const login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // CORREÇÃO: trocado comparePassword por isValidPassword para bater com o seu Model
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role }, // MELHORIA: Adicionado role ao payload do token
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Aplica os middlewares de autenticação e admin para TODAS as rotas neste arquivo
router.use(authMiddleware, adminMiddleware);

// Rotas do CRUD de Usuários
router.post('/', createUser);       // POST   /api/users
router.get('/', getAllUsers);      // GET    /api/users
router.get('/:id', getUserById);   // GET    /api/users/123
router.put('/:id', updateUser);    // PUT    /api/users/123
router.delete('/:id', deleteUser); // DELETE /api/users/123

export default router;
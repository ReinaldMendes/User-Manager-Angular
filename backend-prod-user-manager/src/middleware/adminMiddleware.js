export const adminMiddleware = (req, res, next) => {
  // Este middleware assume que o 'authMiddleware' já rodou e adicionou 'req.user'
  if (req.user && req.user.role === 'ADMINISTRATOR') {
    // Se o usuário existe e tem a role de admin, pode prosseguir
    next();
  } else {
    // Se não for admin, retorna um erro 403 (Forbidden - Proibido)
    res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
  }
};
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  let token;

  // O token JWT geralmente vem no cabeçalho 'Authorization' no formato 'Bearer [TOKEN]'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Extrai o token do cabeçalho ("Bearer TOKEN" -> "TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verifica se o token é válido usando o seu segredo JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Anexa o objeto do usuário à requisição (req.user) para ser usado nas próximas rotas
      // Usamos .select('-password') para garantir que o hash da senha não seja incluído
      req.user = await User.findById(decoded.userId).select('-password');
      
      // Se tudo deu certo, passa para a próxima função (o controller ou o próximo middleware)
      next();
    } catch (error) {
      console.error('Erro na autenticação do token:', error);
      res.status(401).json({ message: 'Não autorizado, o token falhou.' });
    }
  }

  // Se não houver nenhum token no cabeçalho
  if (!token) {
    res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }
};
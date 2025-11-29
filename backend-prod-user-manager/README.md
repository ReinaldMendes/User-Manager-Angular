# Backend - User Manager (Express + MongoDB)

Esta pasta contém uma API Express pronta para servir o frontend `user-manager-frontend`.

Funcionalidades principais:
- CRUD de usuários (create, read, update, delete)
- Autenticação JWT (login)
- Middleware de autorização (admin)
- Hash de senhas com bcrypt

Pré-requisitos:
- Node 18+
- MongoDB acessível (local ou Atlas)

Configuração
1. Copie o arquivo `.env` (se já existir um modelo) ou crie um no diretório `backend-prod-user-manager` com as seguintes variáveis:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/user-manager
JWT_SECRET=sua_chave_secreta_aqui
```

2. Instale dependências e execute o seed para popular o banco com os usuários do mock do frontend:

```powershell
cd backend-prod-user-manager
npm install
npm run seed
npm run dev
```

O `seed` lê o arquivo `../user-manager-frontend/db.json` e importa os usuários existentes, criando-os no MongoDB. O primeiro usuário importado será marcado como `ADMINISTRATOR` para facilitar testes (pode alterar depois).

Endpoints úteis
- POST `/api/auth/register` - registrar novo usuário
- POST `/api/auth/login` - login (retorna token JWT)
- GET `/api/users` - lista usuários (requer token e role ADMINISTRATOR)
- POST `/api/users` - cria usuário (admin)
- GET `/api/users/:id` - obter usuário
- PUT `/api/users/:id` - atualizar usuário
- DELETE `/api/users/:id` - deletar

Observações
- O seed faz upsert por `email` (não cria duplicatas) e garante que a senha seja hashed.
- O frontend atual pode precisar armazenar o token retornado no login e enviá-lo no header `Authorization: Bearer <token>` para acessar rotas protegidas.

Se quiser, posso também:
- Adicionar rota para trocar senha
- Criar scripts de testes (supertest)
- Ajustar o frontend para usar o token automaticamente


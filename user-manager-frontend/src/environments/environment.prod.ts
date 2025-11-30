export const environment = {
  production: true,
  // Se for rodar a API localmente para testar 'prod', use localhost:3000/api
  // Se for deploy na Vercel/Render, coloque a URL final: 'https://sua-api.onrender.com/api'
  apiUrl: 'http://localhost:3000/api', 
  authApiUrl: 'http://localhost:3000/api/auth/login',
  useMockLogic: false
};
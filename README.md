# 📘 Users Management Dashboard – Angular

Painel completo de **gerenciamento de usuários** desenvolvido com **Angular 18**, **Angular Material** e arquitetura moderna usando **Standalone Components**.
Inclui **tela de login funcional** integrada ao mock **JSON Server** e **deploy final na Vercel**.

---

## 🚀 Funcionalidades

* 🔐 **Tela de Login** (bônus do desafio)
* 🧩 **Autenticação simples via JSON Server**
* 🔍 **Pesquisa por nome ou email**
* 🟢 **Filtro por status** (ativo / inativo)
* 🎯 **Filtro por faixa etária** (18–30, 31–50, 50+)
* 📄 **Paginação**
* 👁 **Visualização de detalhes**
* ✏️ **Edição e criação de usuários**
* 🗑 **Exclusão com diálogo de confirmação**
* ⏳ **Spinner de carregamento**
* 🧱 Código limpo, organizado e totalmente tipado

---

## 🌐 Demonstração Online (Deploy)

O projeto foi publicado utilizando **Vercel** e está acessível em:

👉 **[https://user-manager-angular-beta.vercel.app/](https://user-manager-angular-beta.vercel.app/)**

> Obs.: Como o JSON Server roda localmente, apenas as telas que não dependem do backend funcionarão online, a menos que você suba também sua API mock.

---

## 🔐 Login – Informações Importantes

A autenticação foi implementada como **bônus** no desafio.
O login é validado consultando os dados do arquivo:

```
mock/db.json
```

Exemplo de usuário válido:

```json
{
  "id": 1,
  "email": "admin@example.com",
  "password": "123456",
  "name": "Administrador do Sistema",
  "permissions": ["admin"]
}
```

Use **qualquer email e senha cadastrados no mock** para entrar.

---

## 🧰 Tecnologias Utilizadas

* **Angular 18**
* **Angular Material**
* **RxJS**
* **TypeScript**
* **Standalone Components**
* **JSON Server**
* **Vercel (Deploy Frontend)**

---

## 🏗 Estrutura do Projeto

```
src/
└── app/
    ├── auth/
    │   └── login/       # Tela de login
    ├── users/
    │   ├── list/        # Lista de usuários
    │   ├── details/     # Tela de detalhes
    │   └── form/        # Tela de criação/edição
    ├── services/        # Comunicação com API
    ├── models/          # Tipagem e interfaces
    ├── shared/          # Componentes reutilizáveis
    └── app.routes.ts    # Rotas principais
```

---

## ▶️ Como Rodar o Projeto Localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar Angular + JSON Server juntos

```bash
npm run start:all
```

Isso vai iniciar:

* Angular → `http://localhost:4200`
* JSON Server → `http://localhost:3000`

---

## 📁 Scripts Úteis

### Apenas o Angular

```bash
ng serve
```

### Angular + Mock API

```bash
npm run start:all
```

### Build de produção

```bash
ng build
```

---

## 👤 Autor

**Reinald Mendes**
Desenvolvedor Backend & Fullstack

🔗 LinkedIn: [https://www.linkedin.com/in/reinald-mendes/](https://www.linkedin.com/in/reinald-mendes/)





# 📘 Users Management Dashboard – Angular

**Entrega do Desafio Técnico** — Painel completo de **gerenciamento de usuários** desenvolvido com **Angular 18**, **Angular Material** e arquitetura moderna utilizando **Standalone Components**.
 O projeto inclui autenticação, listagem, edição, filtros avançados e integração dupla: **Mock JSON Server** (experiência ideal do desafio) e **API real em Node + Express** (em produção).

---

## 🚀 Resumo da Entrega (o que foi pedido)

A aplicação atende os requisitos do desafio:

* Tela de listagem com pesquisa, filtros (status, faixa etária), paginação e ordenação.
* Formulário reativo para criação/edição (validações: nome, e-mail, idade ≥18, pelo menos 1 permissão).
* Página de detalhes (permits em chips e label de “idade estimada”).
* Feedback visual: loading / snackbar / confirmação para exclusão.
* Deploy (frontend) e instruções no README.

---

## 🏆 Bônus incluídos

* **Tela de Login** (implementada — mock local e integração com API real).
* **API real (Node + Express + MongoDB)** hospedada no **Render** para ambiente de produção (endpoints: login, listar, criar, editar, excluir).
  *Observação:* Render tem cold start → primeira requisição pode levar **20–40s**.
* Em produção a API **não** fornece a página de detalhes (essa fica no mock local).


## 🚀 Funcionalidades

* 🔐 **Tela de Login**
* 📡 **Integração com API real (produção)**
* 🧩 **Autenticação baseada em mock (ambiente local)**
* 🔍 **Pesquisa por nome ou email**
* 🟢 **Filtro por status**
* 🎯 **Filtro por faixa etária (18–30, 31–50, 50+)**
* 📄 **Paginação**
* 👁 **Detalhamento do usuário**
* ✏️ **Criação e edição**
* 🗑 **Exclusão com confirmação**
* ⏳ **Spinner de carregamento**
* 🎨 **UI moderna com Angular Material**
* 🧱 Código limpo, organizado e tipado

---

## 🌐 Deploy em Produção (Vercel + Render)

O frontend está hospedado na **Vercel**:

👉 **[https://user-manager-angular-beta.vercel.app/](https://user-manager-angular-beta.vercel.app/)**

Em ambiente de produção, o projeto **não utiliza o mock** — ele consome a **API real em Node.js + Express**, hospedada no Render:

👉 **[https://user-manager-angular.onrender.com](https://user-manager-angular.onrender.com)**

⚠️ **Importante:** Serviços gratuitos do Render entram em modo sleep após inatividade.
Isso significa que **a primeira requisição pode demorar 20–40 segundos** para acordar o servidor.

Em produção, a API permite:

✔ Login real
✔ Listar usuários
✔ Editar usuários
✔ Criar usuários
✔ Excluir usuários
❌ Visualização de detalhes do usuário (não implementado na API)

---

## 🔐 Login – Acesso Local (Mock)

Para a **melhor experiência do desafio**, execute o projeto localmente usando o mock JSON Server.
Neste modo, o login e todas as funcionalidades pedidas no desafio funcionam 100% instantaneamente e todos os dados vêm do arquivo:

```
mock/db.json
```

### Exemplos de usuários reais do mock (escolha qualquer um):

| Nome               | Email                                                       | Senha       | Status  |
| ------------------ | ----------------------------------------------------------- | ----------- | ------- |
| Ana Silva da Costa | [ana.silva@example.com](mailto:ana.silva@example.com)       | senhaAna123 | inativo |
| Carlos Souza       | [carlos.souza@example.com](mailto:carlos.souza@example.com) | senhaCarlos | inativo |
| Joaquim            | [joaquim@gmail.com](mailto:joaquim@gmail.com)               | joaquimpwd  | ativo   |
| Jurema             | [jurema@gmail.com](mailto:jurema@gmail.com)                 | Jurema123   | ativo   |
| Jandira Fegali     | [jandira123@gamil.com](mailto:jandira123@gamil.com)         | 1234Pokol   | ativo   |
| Jessica            | [jessica@gmail.com](mailto:jessica@gmail.com)               | 123456      | inativo |

> Basta usar **qualquer email e senha listados** acima para acessar no ambiente local.

---

## 🧰 Tecnologias Utilizadas

* **Angular 18**
* **Standalone Components**
* **Angular Material**
* **RxJS**
* **TypeScript**
* **JSON Server (Mock Local)**
* **Node.js + Express (Backend real)**
* **MongoDB**
* **Render (API em produção)**
* **Vercel (Frontend em produção)**

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
    │   └── form/        # Edição/Criação
    ├── services/        # Comunicação API / Mock
    ├── models/          # Interfaces
    ├── shared/          # Componentes reutilizáveis
    └── app.routes.ts    # Rotas principais
```

---

## ▶️ Como Rodar Localmente (Experiência Recomendada)

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar Angular + JSON Server juntos

```bash
npm run start:all
```

Isso iniciará:

* Angular → `http://localhost:4200`
* JSON Server → `http://localhost:3000`

> Neste modo, login, listagem, filtros, edição e exclusão funcionam **100% em tempo real**, com base no mock.

---

## 📁 Scripts Úteis

### Somente o Angular

```bash
ng serve
```

### Angular + Mock

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

🔗 LinkedIn: [https://www.linkedin.com/in/reinald-mendes/](https://www.linkedin.com/in/reinald-mendes/)


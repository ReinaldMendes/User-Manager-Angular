import 'dotenv/config.js';
import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

const mockUsers = [
  {
    _id: "000000000000000000000001",
    name: "Ana Silva da Costa",
    email: "ana.silva@example.com",
    password: "senhaAna123",
    age: 35,
    status: "inativo",
    permissions: ["admin", "editor"]
  },
  {
    _id: "000000000000000000000002",
    name: "Carlos Souza",
    email: "carlos.souza@example.com",
    password: "senhaCarlos",
    age: 45,
    status: "inativo",
    permissions: ["viewer"]
  },
  {
    _id: "000000000000000000000003",
    name: "Joaquim",
    email: "joaquim@gmail.com",
    password: "joaquimpwd",
    age: 30,
    status: "ativo",
    permissions: ["viewer"]
  },
  {
    _id: "000000000000000000000004",
    name: "Jurema",
    email: "jurema@gmail.com",
    password: "Jurema123",
    age: 50,
    status: "ativo",
    permissions: ["admin"]
  },
  {
    _id: "000000000000000000000005",
    name: "Jandira Fegali",
    email: "jandira123@gamil.com",
    password: "1234Pokol",
    age: 35,
    status: "ativo",
    permissions: ["admin"]
  },
  {
    _id: "000000000000000000000006",
    name: "Jessica",
    email: "jessica@gmail.com",
    password: "123456",
    age: 35,
    status: "inativo",
    permissions: ["admin"]
  }
];

const seed = async () => {
  await connectDB();

  console.log("🟡 Limpando coleção...");
  await User.deleteMany({});

  console.log("🟢 Inserindo usuários...");

  for (const u of mockUsers) {
    const hashed = await bcrypt.hash(u.password, 10);

    await User.create({
      _id: u._id,
      name: u.name,
      email: u.email,
      password: hashed,
      age: u.age,
      status: u.status,
      permissions: u.permissions,
      role: "USER"
    });

    console.log(`✔ Usuário criado: ${u.email}`);
  }

  console.log("🎉 Seed finalizado com sucesso!");
  process.exit(0);
};

seed();

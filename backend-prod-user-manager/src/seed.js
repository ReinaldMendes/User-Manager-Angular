import 'dotenv/config.js';
import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';

const seed = async () => {
  await connectDB();

  // Read frontend mock db.json to keep users in sync
  const frontDbPath = path.resolve(process.cwd(), '../user-manager-frontend/db.json');
  let raw;
  try {
    raw = await fs.readFile(frontDbPath, 'utf-8');
  } catch (err) {
    console.error('Erro ao ler db.json do frontend:', err.message);
    process.exit(1);
  }

  const parsed = JSON.parse(raw);
  const users = parsed.users || [];

  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    const email = (u.email || '').toLowerCase();
    const name = u.name || '';
    const plainPassword = u.password || `ChangeMe${Math.floor(Math.random()*1000)}`;
    const age = u.age || 25;
    const status = u.status || 'ativo';
    const permissions = u.permissions || [];

    // Ensure password meets basic complexity by adding a digit/uppercase if needed
    let pwd = plainPassword;
    if (!/[A-Z]/.test(pwd)) pwd = pwd.charAt(0).toUpperCase() + pwd.slice(1);
    if (!/\d/.test(pwd)) pwd = pwd + '1';
    if (pwd.length < 8) pwd = pwd + 'A1a1';

    const hashed = await bcrypt.hash(pwd, 10);

    // Determine role: make the first user ADMINISTRATOR if no admin exists
    let role = 'USER';
    if (i === 0) role = 'ADMINISTRATOR';

    // Upsert using raw collection to avoid Mongoose validation issues
    const update = {
      $set: {
        name,
        email,
        password: hashed,
        role,
        age,
        status,
        permissions,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      }
    };

    try {
      await User.collection.updateOne({ email }, update, { upsert: true });
      console.log(`Seeded user: ${email} (role: ${role}, age: ${age}, status: ${status})`);
    } catch (err) {
      console.error(`Erro ao inserir usuário ${email}:`, err.message);
    }
  }

  console.log('Seed finalizado.');
  process.exit(0);
};

seed();

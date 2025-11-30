import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, age, status, permissions } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }
    const user = new User({ name, email, password, role, age, status, permissions });
    await user.save();
    const out = user.toObject();
    delete out.password;
    res.status(201).json({ message: 'Novo usuário criado com sucesso.', user: out });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Dados inválidos.', error: error.message });
    }
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    // Mantemos -password (não retornar senha)
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, role, age, status, permissions, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;

    // age pode ser 0, por isso cheque !== undefined
    if (age !== undefined) user.age = age;
    if (status !== undefined) user.status = status;
    if (permissions !== undefined) user.permissions = permissions;

    // Se senha for enviada e não vazia, atualiza; caso contrário mantém a atual
    if (password !== undefined && password !== null && password !== '') {
      user.password = password; // o pre("save") faz o hash
    }

    const updatedUser = await user.save();
    const out = updatedUser.toObject();
    delete out.password;

    res.status(200).json({ message: 'Usuário atualizado com sucesso.', user: out });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    await user.deleteOne();
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { q, status, ageRange, _page, _limit, _sort, _order } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }
    if (ageRange) {
      const [minStr, maxStr] = ageRange.split('-');
      const minAge = parseInt(minStr);
      const maxAge = parseInt(maxStr);
      query.age = {};
      if (!isNaN(minAge)) query.age.$gte = minAge;
      if (!isNaN(maxAge)) query.age.$lte = maxAge;
    }
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 10;
    const skip = (page - 1) * limit;

    const sort = {};
    if (_sort) {
      sort[_sort] = (_order === 'desc' || _order === '-1') ? -1 : 1;
    } else {
      sort.name = 1;
    }

    const totalCount = await User.countDocuments(query);

    const users = await User.find(query)
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.set('X-Total-Count', String(totalCount));
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar usuários', error: error.message });
  }
};

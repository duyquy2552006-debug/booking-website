const bcrypt = require('bcryptjs');
const { z } = require('zod');
const userRepository = require('../repositories/user.repository');
const { signToken } = require('../utils/jwt');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

async function register(payload) {
  const data = registerSchema.parse(payload);
  const existing = await userRepository.findByEmail(data.email);

  if (existing) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: 'USER'
  });

  const token = signToken({ userId: user.id, role: user.role });
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
}

async function login(payload) {
  const data = registerSchema.pick({ email: true, password: true }).parse(payload);
  const user = await userRepository.findByEmail(data.email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) {
    throw new Error('Invalid credentials');
  }

  const token = signToken({ userId: user.id, role: user.role });
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
}

module.exports = { register, login };

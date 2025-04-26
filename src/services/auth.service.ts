
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signupSchema, loginSchema } from '../schemas/auth.schema';
import prisma from '../utils/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (data: any) => {
  const parsed = signupSchema.parse(data);
  const hashedPassword = await bcrypt.hash(parsed.password, 10);
  const user = await prisma.user.create({
    data: {
      username: parsed.username,
      email: parsed.email,
      password: hashedPassword
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true
    }
  });
  return user;
};

export const loginUser = async (data: any) => {
  const parsed = loginSchema.parse(data);
  const user = await prisma.user.findUnique({ where: { email: parsed.email } });
  if (!user) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(parsed.password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
  return token;
};

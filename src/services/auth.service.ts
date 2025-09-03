import { prisma } from '../db';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../env';
import type { RegisterDTO } from '../validations/auth.schemas';
import { Role } from '../types/roles.enum';

export async function register(data: RegisterDTO) {
  await checkEmailExists(data.email);

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      birthDate: data.birthDate,
      email: data.email,
      passwordHash,
      role: Role.USER,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      isActive: true,
    },
  });

  return user;
}

export function signTokens(user: { id: number; role: Role }) {
  const payload = { sub: user.id.toString(), role: user.role };

  const access = jwt.sign(payload, env.JWT_SECRET as string, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });

  const refresh = jwt.sign({ ...payload, typ: 'refresh' }, env.JWT_SECRET as string, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
  });

  return { access, refresh };
}

export async function validateLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 404 });
  if (!user.isActive) throw Object.assign(new Error('User already blocked'), { status: 400 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const tokens = signTokens({ id: user.id, role: user.role as Role });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
    tokens,
  };
}

export async function refreshTokens(refreshToken: string) {
  try {
    const decoded = jwt.verify(refreshToken, env.JWT_SECRET) as jwt.JwtPayload;

    if (decoded.typ !== 'refresh') {
      throw new Error('Invalid token type');
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.sub) },
    });

    if (!user || !user.isActive) {
      throw new Error('User not found or inactive');
    }

    return signTokens({ id: user.id, role: user.role as Role });
  } catch {
    throw new Error('Invalid refresh token');
  }
}

export async function checkEmailExists(email: string) {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw Object.assign(new Error('Email already in use'), { status: 409 });
}

import { prisma } from '../db';

export function getById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      fullName: true,
      birthDate: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export function listAll() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export async function blockUser(id: number) {
  const user = await getById(id);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  if (!user.isActive) throw Object.assign(new Error('User already blocked'), { status: 400 });

  return prisma.user.update({
    where: { id },
    data: { isActive: false },
    select: { id: true, isActive: true },
  });
}

export async function checkEmailExists(email: string) {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw Object.assign(new Error('Email already in use'), { status: 409 });
}

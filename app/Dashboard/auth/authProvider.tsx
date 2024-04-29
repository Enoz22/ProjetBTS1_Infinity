import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function verifyAdminUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && (user.role === 'admin' || user.role === 'superadmin') && user.motDePasse === password) {
      const { motDePasse, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error verifying admin user:', error);
    return null;
  }
}
import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@oryza.local';
  const exists = await prisma.user.findUnique({ where: { email } });
  if (!exists) {
    const passwordHash = await argon2.hash('admin123');
    await prisma.user.create({
      data: { email, name: 'Administrator', role: Role.ADMIN, passwordHash },
    });
    console.log('Seeded admin:', email, 'password: admin123');
  } else {
    console.log('Admin already exists.');
  }
}
main().finally(() => prisma.$disconnect());

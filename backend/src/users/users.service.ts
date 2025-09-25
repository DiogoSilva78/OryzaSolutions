import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; name: string; password: string; role?: Role }) {
    const exists = await this.findByEmail(data.email);
    if (exists) throw new ConflictException('Email already registered');

    const passwordHash = await argon2.hash(data.password);
    return this.prisma.user.create({
      data: { email: data.email, name: data.name, passwordHash, role: data.role ?? 'VET' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  }

  // 👇 MÉTODO QUE FALTAVA
  list() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
    });
  }
}

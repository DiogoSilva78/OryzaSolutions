import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private cfg: ConfigService,
  ) {}

  async signUp(email: string, name: string, password: string, role?: Role) {
    const exists = await this.users.findByEmail(email);
    if (exists) throw new ConflictException('Email already registered');
    // delega hash para UsersService.create (se preferires, mantém aqui)
    const user = await (this.users as any).prisma.user.create({
      data: {
        email, name,
        passwordHash: await argon2.hash(password),
        role: role ?? 'VET',
      },
    });
    return this.issueTokens(user.id, user.email, user.role);
  }

  async signIn(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.issueTokens(user.id, user.email, user.role);
  }

  private async issueTokens(id: string, email: string, role: Role) {
    const payload = { sub: id, email, role };
    const access_token = await this.jwt.signAsync(payload, {
      secret: this.cfg.get('JWT_SECRET'),
      expiresIn: this.cfg.get('JWT_EXPIRES_IN') || '15m',
    });
    return { access_token };
  }
}

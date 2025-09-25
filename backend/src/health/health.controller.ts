import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}
  @Get() root() { return { status: 'ok' }; }
  @Get('db') async db() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { db: 'ok' };
  }
}

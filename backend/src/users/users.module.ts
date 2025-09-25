import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],   // 👈 não pode faltar
  exports: [UsersService],
})
export class UsersModule {}

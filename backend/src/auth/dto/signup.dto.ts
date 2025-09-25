import { IsEmail, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';

export enum RoleDto { ADMIN='ADMIN', VET='VET', RECEPTION='RECEPTION', FINANCE='FINANCE', SUPPORT='SUPPORT' }

export class SignUpDto {
  @IsEmail() email!: string;
  @IsString() name!: string;
  @IsString() @MinLength(6) password!: string;
  @IsOptional() @IsEnum(RoleDto) role?: RoleDto;
}

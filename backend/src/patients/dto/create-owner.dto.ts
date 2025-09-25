import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateOwnerDto {
  @IsString() name!: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
}

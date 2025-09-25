import { IsString, IsBoolean, IsOptional, IsDateString, IsIn } from 'class-validator';

export class CreatePatientDto {
  @IsString() ownerId!: string;
  @IsString() name!: string;
  @IsString() species!: string;
  @IsOptional() @IsString() breed?: string;
  @IsIn(['M','F']) sex!: 'M'|'F';
  @IsBoolean() castrated!: boolean;
  @IsOptional() @IsDateString() birthDate?: string; // ISO
}

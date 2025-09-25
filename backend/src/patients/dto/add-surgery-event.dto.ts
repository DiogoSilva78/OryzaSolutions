import { IsString, IsIn, IsDateString, IsOptional } from 'class-validator';

export class AddSurgeryEventDto {
  @IsIn(['PERFORMED','SUGGESTED']) type!: 'PERFORMED'|'SUGGESTED';
  @IsString() procedure!: string;
  @IsDateString() eventDate!: string; // ISO
  @IsOptional() @IsString() notes?: string;
}

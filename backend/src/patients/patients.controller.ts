import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { AddSurgeryEventDto } from './dto/add-surgery-event.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class PatientsController {
  constructor(private svc: PatientsService) {}

  // ---- Owners ----
  @Roles('ADMIN','RECEPTION')
  @Post('owners')
  createOwner(@Body() dto: CreateOwnerDto) {
    return this.svc.createOwner(dto);
  }

  @Roles('ADMIN','RECEPTION','VET')
  @Get('owners/:id')
  getOwner(@Param('id') id: string) {
    return this.svc.getOwner(id);
  }

  // ---- Patients ----
  @Roles('ADMIN','RECEPTION','VET')
  @Post('patients')
  createPatient(@Body() dto: CreatePatientDto) {
    return this.svc.createPatient(dto);
  }

  @Roles('ADMIN','RECEPTION','VET')
  @Get('patients/:id')
  getPatient(@Param('id') id: string) {
    return this.svc.getPatient(id);
  }

  @Roles('ADMIN','RECEPTION','VET')
  @Get('patients')
  listByOwner(@Query('ownerId') ownerId: string) {
    return this.svc.listPatientsByOwner(ownerId);
  }

  // ---- Surgical Events ----
  @Roles('ADMIN','VET')
  @Post('patients/:id/surgical-events')
  addEvent(@Param('id') patientId: string, @Body() dto: AddSurgeryEventDto) {
    return this.svc.addEvent(patientId, dto);
  }

  @Roles('ADMIN','RECEPTION','VET')
  @Get('patients/:id/surgical-events')
  listEvents(@Param('id') patientId: string) {
    return this.svc.listEvents(patientId);
  }
}

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  // Owners
  async createOwner(data: { name: string; email?: string; phone?: string }) {
    try {
      return await this.prisma.owner.create({ data });
    } catch (e: any) {
      if (String(e.message).includes('Unique constraint')) {
        throw new ConflictException('Email already exists for another owner');
      }
      throw e;
    }
  }

  async getOwner(id: string) {
    const o = await this.prisma.owner.findUnique({ where: { id } });
    if (!o) throw new NotFoundException('Owner not found');
    return o;
  }

  // Patients
  async createPatient(data: {
    ownerId: string; name: string; species: string; breed?: string;
    sex: 'M'|'F'; castrated: boolean; birthDate?: string;
  }) {
    // valida owner
    const owner = await this.prisma.owner.findUnique({ where: { id: data.ownerId } });
    if (!owner) throw new NotFoundException('Owner not found');

    // cria paciente
    return this.prisma.patient.create({
      data: {
        ownerId: data.ownerId,
        name: data.name,
        species: data.species,
        breed: data.breed,
        sex: data.sex,
        castrated: data.castrated,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      },
    });
  }

  async getPatient(id: string) {
    const p = await this.prisma.patient.findUnique({
      where: { id },
      include: { owner: true, events: { orderBy: { eventDate: 'desc' } } },
    });
    if (!p) throw new NotFoundException('Patient not found');
    return p;
  }

  async listPatientsByOwner(ownerId: string) {
    return this.prisma.patient.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, species: true, sex: true, castrated: true, birthDate: true },
    });
  }

  // Surgical events (histórico cirúrgico)
  async addEvent(patientId: string, data: { type: 'PERFORMED'|'SUGGESTED'; procedure: string; eventDate: string; notes?: string }) {
    // valida paciente
    const p = await this.prisma.patient.findUnique({ where: { id: patientId } });
    if (!p) throw new NotFoundException('Patient not found');

    return this.prisma.surgeryEvent.create({
      data: {
        patientId,
        type: data.type,
        procedure: data.procedure,
        eventDate: new Date(data.eventDate),
        notes: data.notes,
      },
    });
  }

  listEvents(patientId: string) {
    return this.prisma.surgeryEvent.findMany({
      where: { patientId },
      orderBy: { eventDate: 'desc' },
    });
  }
}

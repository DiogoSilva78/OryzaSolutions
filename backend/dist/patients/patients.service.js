"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PatientsService = class PatientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOwner(data) {
        try {
            return await this.prisma.owner.create({ data });
        }
        catch (e) {
            if (String(e.message).includes('Unique constraint')) {
                throw new common_1.ConflictException('Email already exists for another owner');
            }
            throw e;
        }
    }
    async getOwner(id) {
        const o = await this.prisma.owner.findUnique({ where: { id } });
        if (!o)
            throw new common_1.NotFoundException('Owner not found');
        return o;
    }
    async createPatient(data) {
        const owner = await this.prisma.owner.findUnique({ where: { id: data.ownerId } });
        if (!owner)
            throw new common_1.NotFoundException('Owner not found');
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
    async getPatient(id) {
        const p = await this.prisma.patient.findUnique({
            where: { id },
            include: { owner: true, events: { orderBy: { eventDate: 'desc' } } },
        });
        if (!p)
            throw new common_1.NotFoundException('Patient not found');
        return p;
    }
    async listPatientsByOwner(ownerId) {
        return this.prisma.patient.findMany({
            where: { ownerId },
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, species: true, sex: true, castrated: true, birthDate: true },
        });
    }
    async addEvent(patientId, data) {
        const p = await this.prisma.patient.findUnique({ where: { id: patientId } });
        if (!p)
            throw new common_1.NotFoundException('Patient not found');
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
    listEvents(patientId) {
        return this.prisma.surgeryEvent.findMany({
            where: { patientId },
            orderBy: { eventDate: 'desc' },
        });
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map
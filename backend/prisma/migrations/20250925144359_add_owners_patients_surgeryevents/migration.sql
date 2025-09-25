-- CreateEnum
CREATE TYPE "public"."SurgeryEventType" AS ENUM ('PERFORMED', 'SUGGESTED');

-- CreateTable
CREATE TABLE "public"."Owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" VARCHAR(60) NOT NULL,
    "breed" VARCHAR(60),
    "sex" CHAR(1) NOT NULL,
    "castrated" BOOLEAN NOT NULL DEFAULT false,
    "birthDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SurgeryEvent" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "type" "public"."SurgeryEventType" NOT NULL,
    "procedure" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurgeryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "public"."Owner"("email");

-- CreateIndex
CREATE INDEX "Patient_ownerId_idx" ON "public"."Patient"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_ownerId_name_key" ON "public"."Patient"("ownerId", "name");

-- CreateIndex
CREATE INDEX "SurgeryEvent_patientId_eventDate_idx" ON "public"."SurgeryEvent"("patientId", "eventDate");

-- AddForeignKey
ALTER TABLE "public"."Patient" ADD CONSTRAINT "Patient_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SurgeryEvent" ADD CONSTRAINT "SurgeryEvent_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

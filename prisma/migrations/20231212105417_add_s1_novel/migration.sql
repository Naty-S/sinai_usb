-- CreateEnum
CREATE TYPE "estado_solicitud_enum" AS ENUM ('Aprobado', 'En_Revision', 'Rechazado');

-- AlterTable
ALTER TABLE "profesor" ADD COLUMN     "google_schoolar_id" INTEGER,
ADD COLUMN     "google_schoolar_posts" TEXT[],
ADD COLUMN     "google_schoolar_profile" TEXT,
ADD COLUMN     "orcid_id" INTEGER,
ADD COLUMN     "orcid_posts" TEXT[],
ADD COLUMN     "orcid_profile" TEXT,
ADD COLUMN     "research_gate_id" INTEGER,
ADD COLUMN     "research_gate_posts" TEXT[],
ADD COLUMN     "research_gate_profile" TEXT;

-- CreateTable
CREATE TABLE "s1_novel" (
    "id" SERIAL NOT NULL,
    "evaluador" INTEGER NOT NULL,
    "profesor" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "estado" "estado_solicitud_enum" NOT NULL,
    "observaciones_evaluador" TEXT NOT NULL,
    "observaciones_profesor" TEXT NOT NULL,
    "proyecto" BYTEA NOT NULL,
    "soportes" BYTEA[],

    CONSTRAINT "s1_novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "s1_novel_jurado_usb" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "s1_novel" INTEGER NOT NULL,
    "veredicto" BYTEA,

    CONSTRAINT "s1_novel_jurado_usb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "s1_novel_jurado_externo" (
    "id" SERIAL NOT NULL,
    "s1_novel" INTEGER NOT NULL,
    "correo" TEXT,
    "nombre" TEXT NOT NULL,
    "universidad" TEXT,
    "veredicto" BYTEA,

    CONSTRAINT "s1_novel_jurado_externo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "s1_novel_evaluador_idx" ON "s1_novel"("evaluador");

-- CreateIndex
CREATE UNIQUE INDEX "s1_novel_profesor_idx" ON "s1_novel"("profesor");

-- AddForeignKey
ALTER TABLE "s1_novel" ADD CONSTRAINT "s1_novel_evaluador_fkey" FOREIGN KEY ("evaluador") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s1_novel" ADD CONSTRAINT "s1_novel_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s1_novel_jurado_usb" ADD CONSTRAINT "s1_novel_jurado_usb_s1_novel_fkey" FOREIGN KEY ("s1_novel") REFERENCES "s1_novel"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s1_novel_jurado_usb" ADD CONSTRAINT "s1_novel_jurado_usb_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s1_novel_jurado_externo" ADD CONSTRAINT "s1_novel_jurado_externo_s1_novel_fkey" FOREIGN KEY ("s1_novel") REFERENCES "s1_novel"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

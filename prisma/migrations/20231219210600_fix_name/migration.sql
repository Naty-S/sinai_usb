/*
  Warnings:

  - You are about to drop the `preppraii_solicitud` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "preppraii_profesores" DROP CONSTRAINT "preppraii_profesores_solicitud_fkey";

-- DropForeignKey
ALTER TABLE "preppraii_solicitud" DROP CONSTRAINT "preppraii_solicitud_actividad_fkey";

-- DropForeignKey
ALTER TABLE "preppraii_solicitud" DROP CONSTRAINT "preppraii_solicitud_convocatoria_fkey";

-- DropForeignKey
ALTER TABLE "preppraii_solicitud" DROP CONSTRAINT "preppraii_solicitud_evaluador_fkey";

-- DropForeignKey
ALTER TABLE "preppraii_solicitud" DROP CONSTRAINT "preppraii_solicitud_profesor_fkey";

-- DropTable
DROP TABLE "preppraii_solicitud";

-- CreateTable
CREATE TABLE "prepraii_solicitud" (
    "id" SERIAL NOT NULL,
    "actividad" INTEGER NOT NULL,
    "convocatoria" INTEGER NOT NULL,
    "evaluador" INTEGER NOT NULL,
    "profesor" INTEGER NOT NULL,
    "articulo" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "estado" "estado_solicitud_enum" NOT NULL DEFAULT 'En_Revision',
    "indice" TEXT NOT NULL,
    "monto" INTEGER,
    "observaciones_evaluador" TEXT NOT NULL,
    "observaciones_profesor" TEXT NOT NULL,
    "pagada" BOOLEAN NOT NULL DEFAULT false,
    "tipo" INTEGER,

    CONSTRAINT "prepraii_solicitud_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prepraii_solicitud" ADD CONSTRAINT "prepraii_solicitud_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepraii_solicitud" ADD CONSTRAINT "prepraii_solicitud_convocatoria_fkey" FOREIGN KEY ("convocatoria") REFERENCES "prepraii_convocatoria"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepraii_solicitud" ADD CONSTRAINT "prepraii_solicitud_evaluador_fkey" FOREIGN KEY ("evaluador") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepraii_solicitud" ADD CONSTRAINT "prepraii_solicitud_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preppraii_profesores" ADD CONSTRAINT "preppraii_profesores_solicitud_fkey" FOREIGN KEY ("solicitud") REFERENCES "prepraii_solicitud"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

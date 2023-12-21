/*
  Warnings:

  - You are about to drop the `preppraii_profesores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "preppraii_profesores" DROP CONSTRAINT "preppraii_profesores_profesor_fkey";

-- DropForeignKey
ALTER TABLE "preppraii_profesores" DROP CONSTRAINT "preppraii_profesores_solicitud_fkey";

-- DropTable
DROP TABLE "preppraii_profesores";

-- CreateTable
CREATE TABLE "prepraii_profesores" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "solicitud" INTEGER NOT NULL,
    "contrato_constancia" TEXT NOT NULL,

    CONSTRAINT "prepraii_profesores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prepraii_profesores" ADD CONSTRAINT "prepraii_profesores_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepraii_profesores" ADD CONSTRAINT "prepraii_profesores_solicitud_fkey" FOREIGN KEY ("solicitud") REFERENCES "prepraii_solicitud"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

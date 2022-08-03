/*
  Warnings:

  - A unique constraint covering the columns `[jefe]` on the table `coordinacion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jefe]` on the table `departamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[representante]` on the table `departamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jefe]` on the table `division` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cuota` on table `actividad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departamento` on table `profesor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "coordinacion_jefe_idx";

-- DropIndex
DROP INDEX "departamento_jefe_idx";

-- DropIndex
DROP INDEX "departamento_representante_idx";

-- DropIndex
DROP INDEX "division_jefe_idx";

-- AlterTable
ALTER TABLE "actividad" ALTER COLUMN "cuota" SET NOT NULL;

-- AlterTable
ALTER TABLE "profesor" ALTER COLUMN "departamento" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "coordinacion_jefe_idx" ON "coordinacion"("jefe");

-- CreateIndex
CREATE UNIQUE INDEX "departamento_jefe_idx" ON "departamento"("jefe");

-- CreateIndex
CREATE UNIQUE INDEX "departamento_representante_idx" ON "departamento"("representante");

-- CreateIndex
CREATE UNIQUE INDEX "division_jefe_idx" ON "division"("jefe");

-- AddForeignKey
ALTER TABLE "profesor" ADD CONSTRAINT "profesor_departamento_fkey" FOREIGN KEY ("departamento") REFERENCES "departamento"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

/*
  Warnings:

  - The values [informe,proyecto_de_grado] on the enum `autor_tipo_actividad_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "autor_tipo_actividad_enum_new" AS ENUM ('articulo_revista', 'capitulo_libro', 'composicion', 'evento', 'exposicion', 'grabacion', 'informe_tecnico', 'libro', 'memoria', 'partitura', 'patente', 'premio', 'premio_bienal', 'proyecto_investigacion', 'proyecto_grado', 'recital');
ALTER TABLE "autor_externo" ALTER COLUMN "tipo_actividad" TYPE "autor_tipo_actividad_enum_new" USING ("tipo_actividad"::text::"autor_tipo_actividad_enum_new");
ALTER TABLE "autor_usb" ALTER COLUMN "tipo_actividad" TYPE "autor_tipo_actividad_enum_new" USING ("tipo_actividad"::text::"autor_tipo_actividad_enum_new");
ALTER TYPE "autor_tipo_actividad_enum" RENAME TO "autor_tipo_actividad_enum_old";
ALTER TYPE "autor_tipo_actividad_enum_new" RENAME TO "autor_tipo_actividad_enum";
DROP TYPE "autor_tipo_actividad_enum_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "actividad_grupo_investigacion" DROP CONSTRAINT "actividad_grupo_investigacion_actividad_fkey";

-- AlterTable
ALTER TABLE "grabacion" ALTER COLUMN "jurado" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "actividad_grupo_investigacion" ADD CONSTRAINT "actividad_grupo_investigacion_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

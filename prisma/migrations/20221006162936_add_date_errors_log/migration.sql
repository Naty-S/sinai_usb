/*
  Warnings:

  - You are about to drop the column `campo` on the `errors_log` table. All the data in the column will be lost.
  - Added the required column `fecha` to the `errors_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "errors_log" DROP COLUMN "campo",
ADD COLUMN     "campos" TEXT[],
ADD COLUMN     "fecha" DATE NOT NULL;

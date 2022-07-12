-- CreateEnum
CREATE TYPE "profesores_categoria_enum" AS ENUM ('Agregado', 'Asistente', 'Asociado', 'Instructor', 'Titular');

-- CreateEnum
CREATE TYPE "profesores_diploma_enum" AS ENUM ('Lic.', 'Ph.D.', 'Doctor', 'Magister', 'Ing.');

-- CreateEnum
CREATE TYPE "profesores_dedicacion_enum" AS ENUM ('DE', 'TI', 'TC');

-- CreateEnum
CREATE TYPE "profesores_condicion_enum" AS ENUM ('Contratado', 'Ordinario', 'Jubilado');

-- CreateTable
CREATE TABLE "usuarios" (
    "login" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "padded" INTEGER,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("login")
);

-- CreateTable
CREATE TABLE "profesores" (
    "id" SERIAL NOT NULL,
    "correo" TEXT NOT NULL,
    "nombre1" TEXT NOT NULL,
    "nombre2" TEXT,
    "apellido1" TEXT NOT NULL,
    "apellido2" TEXT,
    "sexo" INTEGER NOT NULL,
    "cedula" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "categoria" "profesores_categoria_enum",
    "codigo" INTEGER,
    "condicion" "profesores_condicion_enum",
    "confirmado" BOOLEAN NOT NULL DEFAULT false,
    "dedicacion" "profesores_dedicacion_enum",
    "diploma" "profesores_diploma_enum",
    "dpto" INTEGER NOT NULL,
    "extension" INTEGER,
    "fecha_contrato" DATE,
    "fecha_ingreso" DATE,
    "lineas_investigacion" TEXT[],
    "perfil" TEXT NOT NULL,
    "universidad" TEXT,
    "url" TEXT,

    CONSTRAINT "profesores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profesores_correo_key" ON "profesores"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "profesores_codigo_key" ON "profesores"("codigo");

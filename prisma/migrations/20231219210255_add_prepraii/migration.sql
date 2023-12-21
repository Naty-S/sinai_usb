-- CreateTable
CREATE TABLE "prepraii_convocatoria" (
    "id" SERIAL NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "fin" DATE NOT NULL,
    "inicio" DATE NOT NULL,
    "monto_tipo1" INTEGER NOT NULL,
    "monto_tipo2" INTEGER NOT NULL,

    CONSTRAINT "prepraii_convocatoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preppraii_solicitud" (
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

    CONSTRAINT "preppraii_solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preppraii_profesores" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "solicitud" INTEGER NOT NULL,
    "contrato_constancia" TEXT NOT NULL,

    CONSTRAINT "preppraii_profesores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "preppraii_solicitud" ADD CONSTRAINT "preppraii_solicitud_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preppraii_solicitud" ADD CONSTRAINT "preppraii_solicitud_convocatoria_fkey" FOREIGN KEY ("convocatoria") REFERENCES "prepraii_convocatoria"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preppraii_solicitud" ADD CONSTRAINT "preppraii_solicitud_evaluador_fkey" FOREIGN KEY ("evaluador") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preppraii_solicitud" ADD CONSTRAINT "preppraii_solicitud_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preppraii_profesores" ADD CONSTRAINT "preppraii_profesores_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preppraii_profesores" ADD CONSTRAINT "preppraii_profesores_solicitud_fkey" FOREIGN KEY ("solicitud") REFERENCES "preppraii_solicitud"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

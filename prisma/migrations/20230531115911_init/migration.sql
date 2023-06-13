-- CreateEnum
CREATE TYPE "articulo_revista_estado_enum" AS ENUM ('Aceptado en Vias de Publicacion', 'Publicado');

-- CreateEnum
CREATE TYPE "autor_tipo_actividad_enum" AS ENUM ('articulo_revista', 'capitulo_libro', 'composicion', 'evento', 'exposicion', 'grabacion', 'informe_tecnico', 'libro', 'memoria', 'partitura', 'patente', 'premio', 'premio_bienal', 'proyecto_investigacion', 'proyecto_grado', 'recital');

-- CreateEnum
CREATE TYPE "composicion_categoria_enum" AS ENUM ('Composicion', 'Arreglo', 'Ejecucion');

-- CreateEnum
CREATE TYPE "convocatoria_pei_nivel_enum" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "evento_modalidad_enum" AS ENUM ('Cartel', 'Oral', 'Invitada');

-- CreateEnum
CREATE TYPE "grabacion_categoria_enum" AS ENUM ('Ejecucion en CD Nacional', 'Ejecucion en CD Internacional', 'CD Completo Nacional', 'CD Completo Internacional', 'Premio Nacional por Concurso', 'Premio Internacional por Concurso');

-- CreateEnum
CREATE TYPE "historico_profesor_departamento_cargo_enum" AS ENUM ('jefe', 'jefe_suplente', 'representante', 'representante_suplente');

-- CreateEnum
CREATE TYPE "historico_profesor_nomina_tipo_personal_enum" AS ENUM ('ORDINARIO', 'JUBILADO', 'SOBREVIVIENTE', 'CONTRATADO', 'PENSIONADO');

-- CreateEnum
CREATE TYPE "log_operacion_actividad_operacion_enum" AS ENUM ('Modificacion', 'Validacion', 'Eliminacion', 'Ingreso');

-- CreateEnum
CREATE TYPE "memoria_formato_enum" AS ENUM ('CD', 'Libro', 'Revista');

-- CreateEnum
CREATE TYPE "memoria_tipo_congreso_enum" AS ENUM ('Nacional', 'Internacional');

-- CreateEnum
CREATE TYPE "meses_enum" AS ENUM ('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');

-- CreateEnum
CREATE TYPE "partitura_categoria_enum" AS ENUM ('Ejecucion en CD Nacional', 'Ejecucion en CD Internacional', 'CD Completo Nacional', 'CD Completo Internacional', 'Premio Nacional por Concurso', 'Premio Internacional por Concurso', 'Partitura');

-- CreateEnum
CREATE TYPE "pei_nivel_enum" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "personal_coordinacion_cargo_enum" AS ENUM ('Jefe', 'Secretaria', 'Asistente');

-- CreateEnum
CREATE TYPE "ppi_nivel_enum" AS ENUM ('Candidato', 'Nivel I', 'Nivel II', 'Nivel III', 'Nivel IV');

-- CreateEnum
CREATE TYPE "profesor_categoria_enum" AS ENUM ('Agregado', 'Asistente', 'Asociado', 'Instructor', 'Titular');

-- CreateEnum
CREATE TYPE "profesor_condicion_enum" AS ENUM ('Contratado', 'Ordinario', 'Jubilado');

-- CreateEnum
CREATE TYPE "profesor_dedicacion_enum" AS ENUM ('Convencional', 'Exclusiva', 'Integral');

-- CreateEnum
CREATE TYPE "profesor_diploma_tipo_enum" AS ENUM ('Lic.', 'Ph.D.', 'Doctor', 'Magister', 'Ing.');

-- CreateEnum
CREATE TYPE "profesor_sexo_enum" AS ENUM ('F', 'M');

-- CreateEnum
CREATE TYPE "proyecto_grado_nivel_academico_enum" AS ENUM ('Doctorado', 'Maestria', 'Especializacion', 'Postgrado', 'Licencitura', 'Ingenieria', 'Pasantia Larga');

-- CreateTable
CREATE TABLE "usuario" (
    "login" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "padded" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("login")
);

-- CreateTable
CREATE TABLE "profesor" (
    "id" SERIAL NOT NULL,
    "correo" TEXT NOT NULL,
    "cedula" INTEGER NOT NULL,
    "codigo" INTEGER,
    "nombre1" TEXT NOT NULL,
    "nombre2" TEXT,
    "apellido1" TEXT NOT NULL,
    "apellido2" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "confirmado" BOOLEAN NOT NULL DEFAULT false,
    "categoria" "profesor_categoria_enum" NOT NULL,
    "condicion" "profesor_condicion_enum" NOT NULL,
    "dedicacion" "profesor_dedicacion_enum" NOT NULL,
    "departamento" INTEGER NOT NULL,
    "diploma_tipo" "profesor_diploma_tipo_enum" NOT NULL,
    "diploma_universidad" TEXT NOT NULL,
    "extension" INTEGER,
    "fecha_contrato" DATE,
    "fecha_ingreso" DATE,
    "lineas_investigacion" TEXT[],
    "perfil" TEXT NOT NULL,
    "sexo" "profesor_sexo_enum" NOT NULL,
    "url" TEXT,

    CONSTRAINT "profesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinacion" (
    "id" SERIAL NOT NULL,
    "jefe" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "siglas" TEXT NOT NULL,

    CONSTRAINT "coordinacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "division" (
    "id" SERIAL NOT NULL,
    "jefe" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamento" (
    "id" SERIAL NOT NULL,
    "coordinacion" INTEGER NOT NULL,
    "division" INTEGER NOT NULL,
    "jefe" TEXT NOT NULL,
    "representante" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrador" (
    "login" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("login")
);

-- CreateTable
CREATE TABLE "convocatoria_pei" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "anio" INTEGER,
    "aplica" BOOLEAN NOT NULL DEFAULT false,
    "mes" "meses_enum",
    "nivel" "convocatoria_pei_nivel_enum",

    CONSTRAINT "convocatoria_pei_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_informe" (
    "id" SERIAL NOT NULL,
    "departamento" INTEGER NOT NULL,
    "profesor" INTEGER NOT NULL,
    "anio" INTEGER NOT NULL,
    "peii" INTEGER NOT NULL,

    CONSTRAINT "datos_informe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupo_investigacion" (
    "id" SERIAL NOT NULL,
    "responsable" TEXT NOT NULL,
    "area" TEXT,
    "nombre" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "grupo_investigacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_profesor_departamento" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "departamento" INTEGER NOT NULL,
    "cargo" "historico_profesor_departamento_cargo_enum" NOT NULL DEFAULT 'jefe',
    "fin" DATE,
    "inicio" DATE NOT NULL,

    CONSTRAINT "historico_profesor_departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_profesor_grupo_investigacion" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "grupo" INTEGER NOT NULL,
    "fin" DATE,
    "inicio" DATE NOT NULL,

    CONSTRAINT "historico_profesor_grupo_investigacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_profesor_nomina" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "fecha_egreso" DATE,
    "fecha_ingreso" DATE NOT NULL,
    "tipo_personal" "historico_profesor_nomina_tipo_personal_enum" NOT NULL,

    CONSTRAINT "historico_profesor_nomina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodo_bra" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "fin" DATE NOT NULL,
    "inicio" DATE NOT NULL,

    CONSTRAINT "periodo_bra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pei" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "anio" INTEGER,
    "aplica" BOOLEAN NOT NULL DEFAULT false,
    "mes" "meses_enum",
    "nivel" "pei_nivel_enum",
    "numero" TEXT,

    CONSTRAINT "pei_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ppi" (
    "id" SERIAL NOT NULL,
    "profesor" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "anio" INTEGER,
    "nivel" "ppi_nivel_enum",
    "numero" INTEGER,

    CONSTRAINT "ppi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_administrativo" (
    "id" SERIAL NOT NULL,
    "cargo" TEXT,
    "login" TEXT NOT NULL,
    "unidad" TEXT NOT NULL,

    CONSTRAINT "personal_administrativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_coordinacion" (
    "id" SERIAL NOT NULL,
    "acceso" INTEGER,
    "cargo" "personal_coordinacion_cargo_enum",
    "coordinacion" INTEGER NOT NULL,
    "login" TEXT NOT NULL,

    CONSTRAINT "personal_coordinacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "red_academica" (
    "id" SERIAL NOT NULL,
    "correo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "red_academica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "red_academica_grupo_investigacion" (
    "red" INTEGER NOT NULL,
    "grupo" INTEGER NOT NULL,

    CONSTRAINT "red_academica_grupo_investigacion_pkey" PRIMARY KEY ("red","grupo")
);

-- CreateTable
CREATE TABLE "errors_log" (
    "id" SERIAL NOT NULL,
    "campos" TEXT[],
    "causa" TEXT NOT NULL,
    "codigo" TEXT,
    "fecha" DATE NOT NULL,
    "mensaje" TEXT NOT NULL,

    CONSTRAINT "errors_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actividad" (
    "id" SERIAL NOT NULL,
    "creada_por" TEXT NOT NULL,
    "validado_por" TEXT,
    "cuota" INTEGER NOT NULL,
    "descripcion" TEXT,
    "fecha_creacion" DATE NOT NULL,
    "fecha_ultima_modificacion" DATE NOT NULL,
    "fecha_validacion" DATE,
    "observaciones" TEXT,
    "palabras_clave" TEXT[],
    "titulo" TEXT NOT NULL,

    CONSTRAINT "actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_operacion_actividad" (
    "id" SERIAL NOT NULL,
    "actividad" INTEGER NOT NULL,
    "usuario" TEXT NOT NULL,
    "fecha" DATE,
    "hora" TIME(6),
    "operacion" "log_operacion_actividad_operacion_enum" NOT NULL DEFAULT 'Modificacion',
    "sql" TEXT NOT NULL,
    "tabla" TEXT NOT NULL,

    CONSTRAINT "log_operacion_actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actividad_grupo_investigacion" (
    "actividad" INTEGER NOT NULL,
    "grupo" INTEGER NOT NULL,

    CONSTRAINT "actividad_grupo_investigacion_pkey" PRIMARY KEY ("actividad","grupo")
);

-- CreateTable
CREATE TABLE "autor_externo" (
    "id" SERIAL NOT NULL,
    "actividad" INTEGER NOT NULL,
    "correo" TEXT,
    "estudiante_carrera" TEXT,
    "es_estudiante" BOOLEAN NOT NULL DEFAULT false,
    "es_ponente" BOOLEAN NOT NULL DEFAULT false,
    "es_tutor" BOOLEAN NOT NULL DEFAULT false,
    "nombre" TEXT NOT NULL,
    "tipo_actividad" "autor_tipo_actividad_enum" NOT NULL,
    "universidad" TEXT NOT NULL,

    CONSTRAINT "autor_externo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autor_usb" (
    "id" SERIAL NOT NULL,
    "actividad" INTEGER NOT NULL,
    "correo" TEXT,
    "profesor_id" INTEGER,
    "estudiante_carrera" TEXT,
    "es_estudiante" BOOLEAN NOT NULL DEFAULT false,
    "es_ponente" BOOLEAN NOT NULL DEFAULT false,
    "es_tutor" BOOLEAN NOT NULL DEFAULT false,
    "nombre" TEXT NOT NULL,
    "tipo_actividad" "autor_tipo_actividad_enum" NOT NULL,

    CONSTRAINT "autor_usb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulo_revista" (
    "actividad" INTEGER NOT NULL,
    "articulo_invitado" BOOLEAN NOT NULL DEFAULT false,
    "con_estudiantes" BOOLEAN NOT NULL DEFAULT false,
    "estado" "articulo_revista_estado_enum" NOT NULL,
    "fecha_publicacion" DATE,
    "indice" TEXT,
    "pag_final" TEXT NOT NULL,
    "pag_inicial" TEXT NOT NULL,
    "paginas" INTEGER NOT NULL,
    "revista" TEXT NOT NULL,
    "volumen" TEXT NOT NULL,

    CONSTRAINT "articulo_revista_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "capitulo_libro" (
    "actividad" INTEGER NOT NULL,
    "aceptado" BOOLEAN NOT NULL DEFAULT false,
    "articulo_invitado" BOOLEAN NOT NULL DEFAULT false,
    "ciudad" TEXT NOT NULL,
    "editores" TEXT[],
    "editorial" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "isbn" TEXT NOT NULL,
    "pag_final" TEXT NOT NULL,
    "pag_inicial" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "titulo_libro" TEXT NOT NULL,

    CONSTRAINT "capitulo_libro_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "composicion" (
    "actividad" INTEGER NOT NULL,
    "categoria" "composicion_categoria_enum" NOT NULL,
    "ciudad" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "financiado_por" TEXT,
    "jurado" TEXT NOT NULL,
    "nombre_evento" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "composicion_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "documento" (
    "id" SERIAL NOT NULL,
    "actividad" INTEGER NOT NULL,
    "archivo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tamanio" INTEGER,

    CONSTRAINT "documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento" (
    "actividad" INTEGER NOT NULL,
    "ciudad" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "institucion" TEXT,
    "internacional" BOOLEAN NOT NULL DEFAULT false,
    "modalidad" "evento_modalidad_enum" NOT NULL,
    "nombre" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "exposicion" (
    "actividad" INTEGER NOT NULL,
    "categoria" TEXT,
    "ciudad" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "financiado_por" TEXT,
    "nombre_evento" TEXT NOT NULL,
    "organizado_por" TEXT,
    "pais" TEXT NOT NULL,

    CONSTRAINT "exposicion_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "grabacion" (
    "actividad" INTEGER NOT NULL,
    "categoria" "grabacion_categoria_enum" NOT NULL,
    "deposito_legal" TEXT,
    "editorial" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "financiado_por" TEXT,
    "jurado" TEXT,
    "nacional" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "grabacion_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "informe_tecnico" (
    "actividad" INTEGER NOT NULL,
    "confidencial" BOOLEAN NOT NULL DEFAULT false,
    "evaluacion_did" BOOLEAN NOT NULL DEFAULT false,
    "evaluadores" TEXT[],
    "fecha_inicio" DATE NOT NULL,
    "institucion" TEXT NOT NULL,
    "meses_duracion" INTEGER NOT NULL,

    CONSTRAINT "informe_tecnico_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "libro" (
    "actividad" INTEGER NOT NULL,
    "aceptado" BOOLEAN NOT NULL DEFAULT true,
    "ciudad" TEXT NOT NULL,
    "editorial" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "isbn" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "libro_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "memoria" (
    "actividad" INTEGER NOT NULL,
    "ciudad" TEXT NOT NULL,
    "con_estudiantes" BOOLEAN NOT NULL DEFAULT false,
    "congreso" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "formato" "memoria_formato_enum" NOT NULL,
    "isbn" TEXT,
    "medio_publicacion" TEXT,
    "pag_final" TEXT,
    "pag_inicial" TEXT,
    "paginas" INTEGER NOT NULL,
    "pais" TEXT NOT NULL,
    "tipo_congreso" "memoria_tipo_congreso_enum" NOT NULL,
    "volumen" TEXT,

    CONSTRAINT "memoria_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "partitura" (
    "actividad" INTEGER NOT NULL,
    "categoria" "partitura_categoria_enum" NOT NULL,
    "deposito_legal" TEXT,
    "editorial" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "financiado_por" TEXT,
    "jurado" TEXT,
    "nacional" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "partitura_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "patente" (
    "actividad" INTEGER NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "numero" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "patente_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "premio" (
    "actividad" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "institucion" TEXT NOT NULL,

    CONSTRAINT "premio_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "premio_bienal" (
    "actividad" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "financiado_por" TEXT,
    "nombre_evento" TEXT NOT NULL,
    "organizado_por" TEXT,
    "pais" TEXT NOT NULL,
    "titulo_premio" TEXT NOT NULL,

    CONSTRAINT "premio_bienal_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "proyecto_grado" (
    "actividad" INTEGER NOT NULL,
    "coordinacion_academica" TEXT NOT NULL,
    "fecha_defensa" DATE NOT NULL,
    "nivel_academico" "proyecto_grado_nivel_academico_enum" NOT NULL,
    "titulo_academico" TEXT NOT NULL,

    CONSTRAINT "proyecto_grado_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "proyecto_investigacion" (
    "actividad" INTEGER NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "institucion" TEXT NOT NULL,
    "meses_duracion" INTEGER NOT NULL,
    "moneda" TEXT NOT NULL,
    "monto" TEXT NOT NULL,

    CONSTRAINT "proyecto_investigacion_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "recital" (
    "actividad" INTEGER NOT NULL,
    "ciudad" TEXT NOT NULL,
    "fecha_evento" DATE NOT NULL,
    "financiado_por" TEXT,
    "jurado" TEXT NOT NULL,
    "nombre_evento" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "recital_pkey" PRIMARY KEY ("actividad")
);

-- CreateTable
CREATE TABLE "log_usuario" (
    "login" TEXT NOT NULL,
    "hora" TIME(6) NOT NULL,
    "fecha" DATE NOT NULL,
    "ip" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "defensa" (
    "anio" INTEGER,
    "carrera" TEXT,
    "estudiante_apellidos" TEXT,
    "estudiante_nombres" TEXT,
    "fecha" DATE,
    "titulo" TEXT,
    "tutor_correo" TEXT,
    "tutor_nombre" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "profesor_correo_idx" ON "profesor"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_cedula_idx" ON "profesor"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_codigo_idx" ON "profesor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "coordinacion_jefe_idx" ON "coordinacion"("jefe");

-- CreateIndex
CREATE UNIQUE INDEX "division_jefe_idx" ON "division"("jefe");

-- CreateIndex
CREATE INDEX "departamento_coordinacion_idx" ON "departamento"("coordinacion");

-- CreateIndex
CREATE INDEX "departamento_division_idx" ON "departamento"("division");

-- CreateIndex
CREATE INDEX "departamento_jefe_idx" ON "departamento"("jefe");

-- CreateIndex
CREATE INDEX "departamento_representante_idx" ON "departamento"("representante");

-- CreateIndex
CREATE INDEX "convocatoria_pei_profesor_idx" ON "convocatoria_pei"("profesor");

-- CreateIndex
CREATE INDEX "datos_informe_departamento_idx" ON "datos_informe"("departamento");

-- CreateIndex
CREATE INDEX "datos_informe_profesor_idx" ON "datos_informe"("profesor");

-- CreateIndex
CREATE INDEX "grupo_investigacion_responsable_idx" ON "grupo_investigacion"("responsable");

-- CreateIndex
CREATE INDEX "historico_profesor_departamento_departamento_idx" ON "historico_profesor_departamento"("departamento");

-- CreateIndex
CREATE INDEX "historico_profesor_departamento_profesor_idx" ON "historico_profesor_departamento"("profesor");

-- CreateIndex
CREATE INDEX "historico_profesor_grupo_investigacion_grupo_idx" ON "historico_profesor_grupo_investigacion"("grupo");

-- CreateIndex
CREATE INDEX "historico_profesor_grupo_investigacion_profesor_idx" ON "historico_profesor_grupo_investigacion"("profesor");

-- CreateIndex
CREATE INDEX "historico_profesor_nomina_profesor_idx" ON "historico_profesor_nomina"("profesor");

-- CreateIndex
CREATE INDEX "pei_profesor_idx" ON "pei"("profesor");

-- CreateIndex
CREATE INDEX "ppi_profesor_idx" ON "ppi"("profesor");

-- CreateIndex
CREATE INDEX "personal_coordinacion_coordinacion_idx" ON "personal_coordinacion"("coordinacion");

-- CreateIndex
CREATE INDEX "red_academica_grupo_investigacion_grupo_idx" ON "red_academica_grupo_investigacion"("grupo");

-- CreateIndex
CREATE INDEX "red_academica_grupo_investigacion_red_idx" ON "red_academica_grupo_investigacion"("red");

-- CreateIndex
CREATE INDEX "actividad_creada_por_idx" ON "actividad"("creada_por");

-- CreateIndex
CREATE INDEX "actividad_validado_por_idx" ON "actividad"("validado_por");

-- CreateIndex
CREATE INDEX "log_operacion_actividad_actividad_idx" ON "log_operacion_actividad"("actividad");

-- CreateIndex
CREATE INDEX "log_operacion_actividad_usuario_idx" ON "log_operacion_actividad"("usuario");

-- CreateIndex
CREATE INDEX "actividad_grupo_investigacion_actividad_idx" ON "actividad_grupo_investigacion"("actividad");

-- CreateIndex
CREATE INDEX "actividad_grupo_investigacion_grupo_idx" ON "actividad_grupo_investigacion"("grupo");

-- CreateIndex
CREATE INDEX "autor_externo_actividad_idx" ON "autor_externo"("actividad");

-- CreateIndex
CREATE UNIQUE INDEX "autor_externo_actividad_nombre_key" ON "autor_externo"("actividad", "nombre");

-- CreateIndex
CREATE INDEX "autor_usb_actividad_idx" ON "autor_usb"("actividad");

-- CreateIndex
CREATE INDEX "autor_usb_correo_idx" ON "autor_usb"("correo");

-- CreateIndex
CREATE INDEX "autor_usb_profesor_id_idx" ON "autor_usb"("profesor_id");

-- CreateIndex
CREATE UNIQUE INDEX "autor_usb_actividad_nombre_key" ON "autor_usb"("actividad", "nombre");

-- CreateIndex
CREATE UNIQUE INDEX "autor_usb_actividad_profesor_id_key" ON "autor_usb"("actividad", "profesor_id");

-- CreateIndex
CREATE INDEX "documento_actividad_idx" ON "documento"("actividad");

-- AddForeignKey
ALTER TABLE "profesor" ADD CONSTRAINT "profesor_correo_fkey" FOREIGN KEY ("correo") REFERENCES "usuario"("login") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinacion" ADD CONSTRAINT "coordinacion_jefe_fkey" FOREIGN KEY ("jefe") REFERENCES "profesor"("correo") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "division" ADD CONSTRAINT "division_jefe_fkey" FOREIGN KEY ("jefe") REFERENCES "profesor"("correo") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departamento" ADD CONSTRAINT "departamento_jefe_fkey" FOREIGN KEY ("jefe") REFERENCES "profesor"("correo") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departamento" ADD CONSTRAINT "departamento_representante_fkey" FOREIGN KEY ("representante") REFERENCES "profesor"("correo") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departamento" ADD CONSTRAINT "departamento_coordinacion_fkey" FOREIGN KEY ("coordinacion") REFERENCES "coordinacion"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departamento" ADD CONSTRAINT "departamento_division_fkey" FOREIGN KEY ("division") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrador" ADD CONSTRAINT "administrador_login_fkey" FOREIGN KEY ("login") REFERENCES "usuario"("login") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convocatoria_pei" ADD CONSTRAINT "convocatoria_pei_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_informe" ADD CONSTRAINT "datos_informe_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_informe" ADD CONSTRAINT "datos_informe_departamento_fkey" FOREIGN KEY ("departamento") REFERENCES "departamento"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupo_investigacion" ADD CONSTRAINT "grupo_investigacion_responsable_fkey" FOREIGN KEY ("responsable") REFERENCES "profesor"("correo") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_profesor_departamento" ADD CONSTRAINT "historico_profesor_departamento_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_profesor_departamento" ADD CONSTRAINT "historico_profesor_departamento_departamento_fkey" FOREIGN KEY ("departamento") REFERENCES "departamento"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_profesor_grupo_investigacion" ADD CONSTRAINT "historico_profesor_grupo_investigacion_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_profesor_grupo_investigacion" ADD CONSTRAINT "historico_profesor_grupo_investigacion_grupo_fkey" FOREIGN KEY ("grupo") REFERENCES "grupo_investigacion"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_profesor_nomina" ADD CONSTRAINT "historico_profesor_nomina_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("cedula") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pei" ADD CONSTRAINT "pei_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ppi" ADD CONSTRAINT "ppi_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("cedula") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_coordinacion" ADD CONSTRAINT "personal_coordinacion_coordinacion_fkey" FOREIGN KEY ("coordinacion") REFERENCES "coordinacion"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "red_academica_grupo_investigacion" ADD CONSTRAINT "red_academica_grupo_investigacion_grupo_fkey" FOREIGN KEY ("grupo") REFERENCES "grupo_investigacion"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "red_academica_grupo_investigacion" ADD CONSTRAINT "red_academica_grupo_investigacion_red_fkey" FOREIGN KEY ("red") REFERENCES "red_academica"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividad" ADD CONSTRAINT "actividad_creada_por_fkey" FOREIGN KEY ("creada_por") REFERENCES "usuario"("login") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividad" ADD CONSTRAINT "actividad_validado_por_fkey" FOREIGN KEY ("validado_por") REFERENCES "usuario"("login") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_operacion_actividad" ADD CONSTRAINT "log_operacion_actividad_usuario_fkey" FOREIGN KEY ("usuario") REFERENCES "usuario"("login") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividad_grupo_investigacion" ADD CONSTRAINT "actividad_grupo_investigacion_grupo_fkey" FOREIGN KEY ("grupo") REFERENCES "grupo_investigacion"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividad_grupo_investigacion" ADD CONSTRAINT "actividad_grupo_investigacion_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autor_externo" ADD CONSTRAINT "autor_externo_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autor_usb" ADD CONSTRAINT "autor_usb_correo_fkey" FOREIGN KEY ("correo") REFERENCES "usuario"("login") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autor_usb" ADD CONSTRAINT "autor_usb_profesor_id_fkey" FOREIGN KEY ("profesor_id") REFERENCES "profesor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autor_usb" ADD CONSTRAINT "autor_usb_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulo_revista" ADD CONSTRAINT "articulo_revista_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capitulo_libro" ADD CONSTRAINT "capitulo_libro_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composicion" ADD CONSTRAINT "composicion_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evento" ADD CONSTRAINT "evento_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exposicion" ADD CONSTRAINT "exposicion_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grabacion" ADD CONSTRAINT "grabacion_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informe_tecnico" ADD CONSTRAINT "informe_tecnico_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "libro" ADD CONSTRAINT "libro_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoria" ADD CONSTRAINT "memoria_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partitura" ADD CONSTRAINT "partitura_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patente" ADD CONSTRAINT "patente_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premio" ADD CONSTRAINT "premio_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premio_bienal" ADD CONSTRAINT "premio_bienal_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyecto_grado" ADD CONSTRAINT "proyecto_grado_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyecto_investigacion" ADD CONSTRAINT "proyecto_investigacion_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recital" ADD CONSTRAINT "recital_actividad_fkey" FOREIGN KEY ("actividad") REFERENCES "actividad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_usuario" ADD CONSTRAINT "log_usuario_login_fkey" FOREIGN KEY ("login") REFERENCES "usuario"("login") ON DELETE CASCADE ON UPDATE CASCADE;

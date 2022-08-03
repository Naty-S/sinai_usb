-- DropIndex
DROP INDEX "departamento_jefe_idx";

-- DropIndex
DROP INDEX "departamento_representante_idx";

-- CreateIndex
CREATE INDEX "departamento_jefe_idx" ON "departamento"("jefe");

-- CreateIndex
CREATE INDEX "departamento_representante_idx" ON "departamento"("representante");

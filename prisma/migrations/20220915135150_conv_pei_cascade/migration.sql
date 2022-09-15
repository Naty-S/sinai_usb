-- DropForeignKey
ALTER TABLE "convocatoria_pei" DROP CONSTRAINT "convocatoria_pei_profesor_fkey";

-- AddForeignKey
ALTER TABLE "convocatoria_pei" ADD CONSTRAINT "convocatoria_pei_profesor_fkey" FOREIGN KEY ("profesor") REFERENCES "profesor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

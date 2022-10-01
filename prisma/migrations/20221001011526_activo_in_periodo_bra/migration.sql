-- AlterTable
ALTER TABLE "periodo_bra" ALTER COLUMN "id" SET DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "periodo_bra_id_seq";

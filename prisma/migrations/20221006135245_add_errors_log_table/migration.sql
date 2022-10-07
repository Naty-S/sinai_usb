-- CreateTable
CREATE TABLE "errors_log" (
    "id" SERIAL NOT NULL,
    "causa" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "codigo" TEXT,
    "campo" TEXT,

    CONSTRAINT "errors_log_pkey" PRIMARY KEY ("id")
);

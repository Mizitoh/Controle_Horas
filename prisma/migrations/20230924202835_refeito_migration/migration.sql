-- CreateTable
CREATE TABLE "grupo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "grupo_id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controle_horas" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "data" DATE NOT NULL,
    "horaInicial" TIME(6) NOT NULL DEFAULT '1970-01-01 12:00:00 +00:00',
    "horaFinal" TIME(6) NOT NULL DEFAULT '1970-01-01 12:00:00 +00:00',

    CONSTRAINT "controle_horas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grupo_nome_key" ON "grupo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controle_horas" ADD CONSTRAINT "controle_horas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

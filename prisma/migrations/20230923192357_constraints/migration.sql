/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `grupo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nome` on table `grupo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "grupo" ALTER COLUMN "nome" SET NOT NULL;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "nome" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "grupo_nome_key" ON "grupo"("nome");

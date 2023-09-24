/*
  Warnings:

  - You are about to drop the column `hora` on the `controle_horas` table. All the data in the column will be lost.
  - Added the required column `horaFinal` to the `controle_horas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaInicial` to the `controle_horas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "controle_horas" DROP COLUMN "hora",
ADD COLUMN     "horaFinal" TIME(6) NOT NULL,
ADD COLUMN     "horaInicial" TIME(6) NOT NULL;

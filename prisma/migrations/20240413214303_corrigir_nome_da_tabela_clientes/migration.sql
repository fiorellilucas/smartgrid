/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_setorId_fkey";

-- DropForeignKey
ALTER TABLE "energiaConsumida" DROP CONSTRAINT "energiaConsumida_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "paineisSolares" DROP CONSTRAINT "paineisSolares_clienteId_fkey";

-- DropTable
DROP TABLE "Cliente";

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "setorId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paineisSolares" ADD CONSTRAINT "paineisSolares_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "energiaConsumida" ADD CONSTRAINT "energiaConsumida_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

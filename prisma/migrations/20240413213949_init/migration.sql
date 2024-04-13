-- CreateTable
CREATE TABLE "instalacoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "tipoLocal" TEXT NOT NULL,
    "telefone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instalacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setores" (
    "id" SERIAL NOT NULL,
    "instalacaoId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "setores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "setorId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paineisSolares" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "capacidadeGeracao" INTEGER NOT NULL,

    CONSTRAINT "paineisSolares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "energiaGerada" (
    "id" SERIAL NOT NULL,
    "painelSolarId" INTEGER NOT NULL,
    "dataDado" TIMESTAMP(3) NOT NULL,
    "energiaGerada" INTEGER NOT NULL,
    "temperaturaMomento" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "energiaGerada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "energiaConsumida" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "dataDado" TIMESTAMP(3) NOT NULL,
    "energiaConsumida" INTEGER NOT NULL,

    CONSTRAINT "energiaConsumida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "energiaArmazenada" (
    "id" SERIAL NOT NULL,
    "dataDado" TIMESTAMP(3) NOT NULL,
    "energiaArmazenada" INTEGER NOT NULL,

    CONSTRAINT "energiaArmazenada_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "setores" ADD CONSTRAINT "setores_instalacaoId_fkey" FOREIGN KEY ("instalacaoId") REFERENCES "instalacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paineisSolares" ADD CONSTRAINT "paineisSolares_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "energiaGerada" ADD CONSTRAINT "energiaGerada_painelSolarId_fkey" FOREIGN KEY ("painelSolarId") REFERENCES "paineisSolares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "energiaConsumida" ADD CONSTRAINT "energiaConsumida_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

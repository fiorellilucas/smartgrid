import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express()
const port = 3000

const prisma = new PrismaClient()

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/instalacoes", async (req, res) => {
    let instalacoes = await prisma.instalacao.findMany()
    res.send(instalacoes)
})

app.get("/setores", async (req, res) => {
    let setores = await prisma.setor.findMany()
    res.send(setores)
})

app.get("/clientes", async (req, res) => {
    let clientes = await prisma.cliente.findMany()
    res.send(clientes)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
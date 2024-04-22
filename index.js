import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express()
const port = 3000

const prisma = new PrismaClient()

app.use(express.json())

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

app.post("/clientes/consumo/:id", async (req, res) => {
    cliente_id = req.body["clienteId"]
    data_dado = new Date(req.body["dataDado"])
    energia_consumida = req.body["energiaConsumida"]
    await prisma.energiaConsumida.create({
        data: {
            clienteId: cliente_id,
            dataDado: data_dado,
            energiaConsumida: energia_consumida
        }
    })
    res.sendStatus(200)
})

app.get("/paineis", async (req, res) => {
    let paineis = await prisma.painelSolar.findMany()
    res.send(paineis)
})

app.post("/paineis/geracao/:id", async (req, res) => {
    painel_id = req.body["painelId"]
    data_dado = new Date(req.body["dataDado"])
    energia_gerada = req.body["energiaGerada"]
    await prisma.energiaGerada.create({
        data: {
            painelSolarId: painel_id,
            dataDado: data_dado,
            energiaGerada: energia_gerada
        }
    })
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
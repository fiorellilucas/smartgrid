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

app.get("/clientes/consumo/:id", async (req, res) => {
    let cliente_id = parseInt(req.params["id"])
    let cliente_consumo = await prisma.energiaConsumida.findMany({
        where: {
            clienteId: cliente_id
        }
    })
    res.send(cliente_consumo)
})

app.post("/clientes/consumo/:id", async (req, res) => {
    let cliente_id = parseInt(req.params["id"])
    let data_dado = new Date(req.body["dataDado"])
    let energia_consumida = req.body["energiaConsumida"]
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

app.get("/paineis/geracao/:id", async (req, res) => {
    let painel_id = parseInt(req.params["id"])
    let painel_geracao = await prisma.energiaGerada.findMany({
        where: {
            painelSolarId: painel_id
        }
    })
    res.send(painel_geracao)
})

app.post("/paineis/geracao/:id", async (req, res) => {
    let painel_id = parseInt(req.params["id"])
    let data_dado = new Date(req.body["dataDado"])
    let energia_gerada = req.body["energiaGerada"]
    await prisma.energiaGerada.create({
        data: {
            painelSolarId: painel_id,
            dataDado: data_dado,
            energiaGerada: energia_gerada,
        }
    }) 
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
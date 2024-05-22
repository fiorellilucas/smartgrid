import { useEffect, useState } from "react"
import GraficoGeracaoRecente from "../components/grafico-geracao-recente"
import GraficoConsumoRecente from "../components/grafico-consumo-recente"

export default function VisaoGeral() {

  const [geracao, setGeracao] = useState([])
  const [consumo, setConsumo] = useState([])
  const [geracaoTotal, setGeracaoTotal] = useState(0)
  const [consumoTotal, setConsumoTotal] = useState(0)
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(0)

  useEffect(() => {
    async function fetchDadosAtuais() {
      let responseGeracao = await fetch("http://localhost:3000/geracao/instalacoes/1")
      let geracaoJson = await responseGeracao.json()
      setGeracao(geracaoJson)

      let responseConsumo = await fetch("http://localhost:3000/consumo/instalacoes/1")
      let consumoJson = await responseConsumo.json()
      setConsumo(consumoJson)
    }
    fetchDadosAtuais()
  }, [])

  useEffect(() => {
    if (geracao["geracaoAtual"] != undefined) {
      let ger = 0
      for (let i = 0; i < geracao["geracaoAtual"].length; i++) {
        ger += geracao["geracaoAtual"][i]["energiaGerada"]
      }
      ger = ger/1000
      setGeracaoTotal(ger.toLocaleString("pt-BR"))
      
      setUltimaAtualizacao(new Date(geracao["geracaoAtual"][0]["dataDado"]).toLocaleString("pt-BR"))
    }

    if (consumo["consumoAtual"] != undefined) {
      let con = 0
      for (let i = 0; i < consumo["consumoAtual"].length; i++) {
        con += consumo["consumoAtual"][i]["energiaConsumida"]
      }
      setConsumoTotal(con.toLocaleString("pt-BR"))
    }

  }, [consumo, geracao])

  return (
    <div>
      <h1>{geracao["nome"] || "Carregando"}</h1>
      <p>Geração atual: {geracaoTotal} kW</p>
      <p>Consumo atual: {consumoTotal} kW</p>
      <p>Dados atualizados em {ultimaAtualizacao == 0 ? "Carregando" : ultimaAtualizacao}</p>
      <div className="graficos-container">
        <div>
          <GraficoGeracaoRecente />
        </div>
        <div>
          <GraficoConsumoRecente />
        </div>
      </div>
    </div>
  )
}
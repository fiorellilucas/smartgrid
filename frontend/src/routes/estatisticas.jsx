import { useEffect, useState } from "react"
import GraficoGeracaoRecente from "../components/grafico-geracao-recente"
import GraficoConsumoRecente from "../components/grafico-consumo-recente"

export default function Estatisticas() {

  const [geracao, setGeracao] = useState([])
  const [consumo, setConsumo] = useState([])

  useEffect(() => {
    async function fetchDadosAtuais() {
      let responseGeracao = await fetch("http://localhost:3000/geracao/recente/instalacoes/1")
      let geracaoJson = await responseGeracao.json()
      setGeracao(geracaoJson)

      let responseConsumo = await fetch("http://localhost:3000/consumo/recente/instalacoes/1")
      let consumoJson = await responseConsumo.json()
      setConsumo(consumoJson)
    }
    fetchDadosAtuais()
  }, [])

  useEffect(() => {
    // grafico?
  }, [geracao, consumo])

  return (
    <div>
      <h1>{geracao["nome"] || "Carregando"}</h1>
      <div className="graficos-container">
        <div>
          <h3>Geração (últimas 3 horas)</h3>
          <GraficoGeracaoRecente geracao={geracao} />
        </div>
        <div>
          <h3>Consumo (últimas 3 horas)</h3>
          <GraficoConsumoRecente consumo={consumo} />
        </div>
      </div>
    </div>
  )
}
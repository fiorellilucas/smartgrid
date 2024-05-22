import { LineChart, Line, YAxis, XAxis } from 'recharts'
import { useState, useEffect } from 'react'

export default function GraficoGeracaoRecente() {

  const [geracao, setGeracao] = useState([])

  useEffect(() => {
    async function fetchDadosRecentes() {
      let responseGeracao = await fetch("http://localhost:3000/geracao/recente/instalacoes/1")
      let geracaoJson = await responseGeracao.json()
      setGeracao(geracaoJson)
    }
    fetchDadosRecentes()
  }, [])

  return (
    <div>
      <h3>Geração (últimas 3 horas)</h3>
      <LineChart width={500} height={300} data={geracao["geracaoRecente"]}>
        <Line type="monotone" dataKey="energiaGerada" stroke='#ffffff' />
        <YAxis unit={"kW"} />
      </LineChart>
    </div>
  )
}
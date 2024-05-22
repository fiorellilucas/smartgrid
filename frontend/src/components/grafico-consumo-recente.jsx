import { LineChart, Line, YAxis, XAxis } from 'recharts'
import { useState, useEffect } from 'react'

export default function GraficoConsumoRecente() {

  const [consumo, setConsumo] = useState([])

  useEffect(() => {
    async function fetchDadosRecentes() {
      let responseConsumo = await fetch("http://localhost:3000/consumo/recente/instalacoes/1")
      let consumoJson = await responseConsumo.json()
      setConsumo(consumoJson)
    }
    fetchDadosRecentes()
  }, [])

  return (
    <div className='grafico-consumo-recente'>
      <h3>Consumo (últimas 3 horas)</h3>
      <LineChart width={500} height={300} data={consumo["consumoRecente"]}>
        <Line type="monotone" dataKey="energiaConsumida" stroke='#ffffff' />
        <YAxis unit={"kW"} />
      </LineChart>
    </div>
  )
}
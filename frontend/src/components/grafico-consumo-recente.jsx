import { LineChart, Line, CartesianGrid, YAxis, XAxis } from 'recharts'

export default function GraficoConsumoRecente({ consumo }) {

  return (
    <LineChart width={500} height={300} data={consumo["consumoRecente"]}>
      <Line type="monotone" dataKey="energiaConsumida" stroke='#ffffff' />
      <YAxis unit={"kW"} />
    </LineChart>
  )
}
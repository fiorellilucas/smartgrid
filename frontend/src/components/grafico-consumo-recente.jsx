import { LineChart, Line } from 'recharts'

export default function GraficoConsumoRecente({ consumo }) {

  return (
    <LineChart width={400} height={400} data={consumo["consumoRecente"]}>
      <Line type="monotone" dataKey="energiaConsumida" stroke='#ffffff' />
    </LineChart>
  )
}
import { LineChart, Line } from 'recharts'

export default function GraficoGeracaoRecente({ geracao }) {

  return (
    <LineChart width={400} height={400} data={geracao["geracaoRecente"]}>
      <Line type="monotone" dataKey="energiaGerada" stroke='#ffffff' />
    </LineChart>
  )
}
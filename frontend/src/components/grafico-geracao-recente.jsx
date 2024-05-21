import { LineChart, Line, YAxis, XAxis } from 'recharts'

export default function GraficoGeracaoRecente({ geracao }) {

  return (
    <LineChart width={500} height={300} data={geracao["geracaoRecente"]}>
      <Line type="monotone" dataKey="energiaGerada" stroke='#ffffff' />
      <YAxis unit={"kW"} />
    </LineChart>
  )
}
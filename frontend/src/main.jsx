import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx'
import VisaoGeral from './routes/visao-geral.jsx'
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>hello world</h1>
  },
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        path: "visao-geral",
        element: <VisaoGeral />
      },
      {
        path: "estatisticas",
        element: <h1>estatísticas</h1>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

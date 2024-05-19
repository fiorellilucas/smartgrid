import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx'
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>
  },
  {
    path: "/dashboard",
    element: <h1>dashboard</h1>
  }, 
  {
    path: "/dashboard/visao-geral",
    element: <h1>visão geral</h1>
  },
  {
    path: "/dashboard/estatisticas",
    element: <h1>estatísticas</h1>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

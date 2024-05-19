import { Outlet } from "react-router-dom";
import BotaoSidebar from "../components/botao-sidebar";

export default function Root() {
  return (
    <div className="flex-container">
      <div className="sidebar">
        <BotaoSidebar titulo={"Visão geral"} link="/dashboard/visao-geral" />
        <BotaoSidebar titulo={"Estatísticas"} link="/dashboard/estatisticas" />
      </div>
      <div className="content" id="detail">
        <Outlet />
      </div>
    </div>
  )
}
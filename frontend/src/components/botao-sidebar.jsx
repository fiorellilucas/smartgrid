import { Link } from "react-router-dom";
import "../styles/botao-sidebar.css"

export default function BotaoSidebar({ titulo, link }) {
  return (
    <Link to={link} className="botao-sidebar">{titulo}</Link>
  )
}
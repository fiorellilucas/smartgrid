import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex-container">
      <div className="sidebar">
        <h1>sidebar</h1>
      </div>
      <div className="content" id="detail">
        <Outlet />
      </div>
    </div>
  )
}
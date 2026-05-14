import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default PublicLayout;

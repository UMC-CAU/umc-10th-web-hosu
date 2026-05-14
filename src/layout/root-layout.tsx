import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout;

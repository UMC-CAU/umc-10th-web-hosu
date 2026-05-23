import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar";
import useSidebar from "../hooks/useSidebar";

const RootLayout = () => {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar onToggle={toggle} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} onClose={close} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RootLayout;

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Modal from './Modal';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Modal />
    </div>
  );
}

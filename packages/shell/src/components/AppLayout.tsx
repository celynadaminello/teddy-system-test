import { Outlet, Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { Sidebar } from 'design-system';
import teddyLogo from '../assets/logo-teddy.svg';

export function AppLayout() {
  const userName = useUserStore((state) => state.name);

  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-gray-50">

      <header className="col-span-2 flex items-center gap-5 border-b border-gray-200 bg-white p-5">
      <img src={teddyLogo} alt="Teddy Logo" className="h-8 w-auto" />
        <nav className="hidden gap-4 md:flex">
          <Link to="/clients" className="text-blue-600 hover:underline">
            Clientes
          </Link>
          <Link to="/selected" className="text-blue-600 hover:underline">
            Clientes Selecionados
          </Link>
        </nav>
        <div className="ml-auto text-gray-700">
          Olá, {userName || 'Usuário'}!
        </div>
      </header>
      <Sidebar />

      <main className="overflow-y-auto p-5">
        <Outlet />
      </main>
    </div>
  );
}
import { Outlet, Link } from 'react-router-dom';

export function AppLayout() {
  return (
    <>
      <header className="flex items-center gap-5 border-b border-gray-200 bg-gray-50 p-5">
        <h2 className="m-0 text-xl font-bold">Teddy</h2>
        <nav className="flex gap-4">
          <Link to="/clients" className="text-blue-600 hover:underline">
            Clientes
          </Link>
          <Link to="/selected" className="text-blue-600 hover:underline">
            Clientes Selecionados
          </Link>
        </nav>
        <div className="ml-auto text-gray-700">
          Olá, Usuário!
        </div>
      </header>

      <main className="p-5">
        <Outlet />
      </main>
    </>
  );
}
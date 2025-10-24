import { Link } from 'react-router-dom';

const HomeIcon = () => <span>🏠</span>;
const ClientsIcon = () => <span>👥</span>;
const SelectedIcon = () => <span>⭐</span>;

export function Sidebar() {
  return (
    <aside className="flex w-64 flex-col bg-white p-4 shadow-lg">
      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg p-3 text-gray-700 hover:bg-gray-100"
        >
          <HomeIcon />
          <span className="font-medium">Home</span>
        </Link>
        <Link
          to="/clients"
          className="flex items-center gap-3 rounded-lg bg-gray-100 p-3 font-semibold text-gray-900"
        >
          <ClientsIcon />
          <span className="font-medium">Clientes</span>
        </Link>
        <Link
          to="/selected"
          className="flex items-center gap-3 rounded-lg p-3 text-gray-700 hover:bg-gray-100"
        >
          <SelectedIcon />
          <span className="font-medium">Clientes selecionados</span>
        </Link>
      </nav>
    </aside>
  );
}
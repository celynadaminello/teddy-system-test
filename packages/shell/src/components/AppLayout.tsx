import { Outlet } from 'react-router-dom';
import { Sidebar } from 'design-system';
import { Header } from './Header';

export function AppLayout() {
  return (
    <div className="h-screen bg-gray-50">
      <Header />
      <div className="grid h-[calc(100vh-100px)] grid-cols-[auto_1fr]">
        <Sidebar />
        <main className="overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
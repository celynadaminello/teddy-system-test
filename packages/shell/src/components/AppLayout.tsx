import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function AppLayout() {
  return (
    <div className="h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      <Header />
      <main className="h-[calc(100vh-100px)] overflow-y-auto p-5">
        <Outlet />
      </main>
    </div>
  );
}
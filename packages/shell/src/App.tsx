import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from 'login';
import { ClientListPage } from 'client-list';
import { SelectedClientsPage } from 'selected-clients';
import { useUserStore } from './stores/useUserStore';
import { useEffect } from 'react';

function AppContent() {
  const user = useUserStore((state) => state.name);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  useEffect(() => {
    if (user && location.pathname === '/') {
      navigate('/clients', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/clients" element={<ClientListPage />} />
        <Route path="/selected" element={<SelectedClientsPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <div className="font-sans">
      <HashRouter>
        <AppContent />
      </HashRouter>
    </div>
  );
}

export default App;
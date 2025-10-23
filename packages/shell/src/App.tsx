import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const LoginPage = React.lazy(() => import('login'));
const ClientListPage = React.lazy(() => import('client-list'));
const SelectedClientsPage = React.lazy(() => import('selected-clients'));

function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: 20, background: '#f8f9fa', borderBottom: '1px solid #e0e0e0', display: 'flex', gap: 20, alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Teddy</h2>
        <nav>
          <Link to="/clients">Clientes</Link> |{' '}
          <Link to="/selected">Clientes Selecionados</Link>
        </nav>
        <div style={{ marginLeft: 'auto' }}>Olá, Usuário!</div>
      </header>

      <main style={{ padding: 20 }}>
        <React.Suspense fallback={<div>Carregando página...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/clients" element={<ClientListPage />} />
            <Route path="/selected" element={<SelectedClientsPage />} />
          </Routes>
        </React.Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
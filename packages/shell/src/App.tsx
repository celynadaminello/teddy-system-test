// packages/shell/src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { Button } from 'design-system';

const LoginPage = React.lazy(() => import('login'));
const ClientListPage = React.lazy(() => import('client-list'));
const SelectedClientsPage = React.lazy(() => import('selected-clients'));

function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: 20, background: '#eee', display: 'flex', gap: 20 }}>
        <h2>Teddy</h2>
        <nav>
          <Link to="/clients">Clientes</Link> |{' '}
          <Link to="/selected">Clientes Selecionados</Link>
        </nav>
        <div style={{ marginLeft: 'auto' }}>Olá, Usuário!</div>
      </header>

      <main style={{ padding: 20 }}>
        <h3>Botão do Design System:</h3>
        <Button onClick={() => alert('Funciona!')}>Clique em mim!</Button>
        <hr />

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
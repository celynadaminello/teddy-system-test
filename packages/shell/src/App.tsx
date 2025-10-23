import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';

const LoginPage = React.lazy(() => import('login'));
const ClientListPage = React.lazy(() => import('client-list'));
const SelectedClientsPage = React.lazy(() => import('selected-clients'));

function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <React.Suspense fallback={<div className="p-5">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<AppLayout />}>
              <Route path="/clients" element={<ClientListPage />} />
              <Route path="/selected" element={<SelectedClientsPage />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;